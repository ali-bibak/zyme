import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { runTool } from "./toolRunner";
import { logMessage, showLoader } from "./ui";

// Types
import type { AIMessage } from "../types";

export const runAgent = async ({
  userMessage,
  url,
  tools,
}: {
  userMessage: string;
  url: string;
  tools: any[];
}) => {
  const history = await getMessages();

  const loader = showLoader("🤔");

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });

    await addMessages([response]);

    if (response.content) {
      loader.stop();
      logMessage(response);
      return getMessages();
    }

    console.log("HEHE", response);

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      logMessage(response);
      loader.update(`executing: ${toolCall.function.name}`);

      const toolResponse = await runTool(toolCall, userMessage, url);
      await saveToolResponse(toolCall.id, toolResponse);
      loader.update(`done: ${toolCall.function.name}`);
    }
  }
};

export const runAgentEval = async ({
  userMessage,
  url,
  tools,
}: {
  userMessage: string;
  url: string;
  tools: any[];
}) => {
  let messages: AIMessage[] = [{ role: "user", content: userMessage }];

  while (true) {
    const response = await runLLM({ messages, url, tools });
    messages = [...messages, response];

    if (response.content) {
      return messages;
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];

      const toolResponse = await runTool(toolCall, userMessage, url);
      messages = [
        ...messages,
        { role: "tool", content: toolResponse, tool_call_id: toolCall.id },
      ];
    }
  }
};
