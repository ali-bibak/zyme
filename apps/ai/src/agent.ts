import { runTool } from "./hub";
import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { logMessage, showLoader } from "./ui";

// Types
import type { AIMessage } from "../types";

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any[];
}) => {
  const history = await getMessages();
  const loader = showLoader("🤔");
  await addMessages([{ role: "user", content: userMessage }]);

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });

    await addMessages([response]);

    if (response.content) {
      loader.stop();
      logMessage(response);
      return getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      logMessage(response);
      loader.update(`executing: ${toolCall.function.name}`);

      const toolResponse = await runTool(toolCall, userMessage);
      await saveToolResponse(toolCall.id, toolResponse);
      loader.update(`done: ${toolCall.function.name}`);
    }
  }
};

export const runAgentEval = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any[];
}) => {
  let messages: AIMessage[] = [{ role: "user", content: userMessage }];

  while (true) {
    const response = await runLLM({ messages, tools });
    messages = [...messages, response];

    if (response.content) {
      return messages;
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];

      const toolResponse = await runTool(toolCall, userMessage);
      messages = [
        ...messages,
        { role: "tool", content: toolResponse, tool_call_id: toolCall.id },
      ];
    }
  }
};
