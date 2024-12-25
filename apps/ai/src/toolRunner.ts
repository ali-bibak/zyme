import { dadJoke, dadJokeToolDefinition } from "./tools/dadJoke";

// Types
import type OpenAI from "openai";

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  switch (toolCall.function.name) {
    case dadJokeToolDefinition.name:
      return dadJoke(input);

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`;
  }
};
