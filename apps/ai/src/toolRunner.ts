import {
  getBuildingBlocks,
  packageBuildingBlocksToolDefinition,
} from "./tools/blocks";
import { dadJoke, dadJokeToolDefinition } from "./tools/dadJoke";

// Types
import type OpenAI from "openai";

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
  url: string,
) => {
  const input = {
    userMessage,
    url,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  switch (toolCall.function.name) {
    case dadJokeToolDefinition.name:
      return dadJoke(input);
    case packageBuildingBlocksToolDefinition.name:
      return getBuildingBlocks(input);

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`;
  }
};
