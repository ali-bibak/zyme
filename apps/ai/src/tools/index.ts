import { packageBuildingBlocksToolDefinition } from "./prompts/blocks";
import { packageExamplesToolDefinition } from "./prompts/example";
import { packageOverviewToolDefinition } from "./prompts/overview";

export const tools = [
  packageBuildingBlocksToolDefinition,
  packageExamplesToolDefinition,
  packageOverviewToolDefinition,
];
