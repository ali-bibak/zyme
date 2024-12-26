import {
  getBuildingBlocks,
  packageBuildingBlocksToolDefinition,
} from "./tools/prompts/blocks";
import {
  getExamples,
  packageExamplesToolDefinition,
} from "./tools/prompts/example";
import {
  getOverview,
  packageOverviewToolDefinition,
} from "./tools/prompts/overview";

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
    case packageBuildingBlocksToolDefinition.name:
      return getBuildingBlocks(input);
    case packageOverviewToolDefinition.name:
      return getOverview(input);
    case packageExamplesToolDefinition.name:
      return getExamples(input);

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`;
  }
};
