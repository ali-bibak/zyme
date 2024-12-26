import { zodFunction, zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { openai } from "./ai";
import { getSummary } from "./memory";
import { systemPrompt as defaultSystemPrompt } from "./systemPrompt";

// Types
import type { AIMessage } from "../types";

enum AIModels {
  primary = "gpt-4o-mini",
}

export const runLLM = async ({
  messages,
  tools = [],
  temperature = 0.1,
  systemPrompt,
}: {
  messages: AIMessage[];
  tools?: any[];
  temperature?: number;
  systemPrompt?: string;
  repoContent?: string;
}) => {
  const formattedTools = tools.map(zodFunction);
  const summary = await getSummary();

  console.log(formattedTools);

  const response = await openai.chat.completions.create({
    model: AIModels.primary,
    temperature,
    messages: [
      {
        role: "system",
        content: `${
          systemPrompt || defaultSystemPrompt
        }. Conversation summary so far: ${summary}`,
      },
      ...messages,
    ],
    ...(formattedTools.length > 0 && {
      tools: formattedTools,
      tool_choice: "auto",
      parallel_tool_calls: false,
    }),
  });

  return response.choices[0].message;
};

export const runApprovalCheck = async (userMessage: string) => {
  const response = await openai.beta.chat.completions.parse({
    model: AIModels.primary,
    temperature: 0.1,
    response_format: zodResponseFormat(
      z.object({
        approved: z.boolean().describe("did the user say they approved or not"),
      }),
      "math_reasoning",
    ),
    messages: [
      {
        role: "system",
        content:
          "Determine if the user approved the jokes generation. If you are not sure, then it is not approved.",
      },
      { role: "user", content: userMessage },
    ],
  });

  return response.choices[0].message.parsed?.approved;
};

export const summarizeMessages = async (messages: AIMessage[]) => {
  const response = await runLLM({
    systemPrompt:
      "Summarize the key points of the conversation in a concise way that would be helpful as context for future interactions. Make it like a play by play of the conversation.",
    messages,
    temperature: 0.3,
  });

  return response.content || "";
};
