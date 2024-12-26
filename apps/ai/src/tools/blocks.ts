import { z } from "zod";

// Types
import type { ToolFn } from "../../types";

import EmbeddingHandler from "../services/Embedding";
// Services
import GithubClient from "../services/Github";

async function getRepoIngest(url: string) {
  const repoUrl = url;
  const client = new GithubClient(repoUrl);
  let content = "";
  try {
    const data = await client.prepareIngest();
    data.forEach(
      ({
        filePath,
        promptFriendlyContent,
      }: { filePath: string; promptFriendlyContent: string }) => {
        content += promptFriendlyContent;
      },
    );
    return { data, content };
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}
export const packageBuildingBlocksToolDefinition = {
  name: "getBuildingBlocks",
  parameters: z.object({
    url: z
      .string()
      .describe(
        "The URL of the open-source package's repository or homepage to analyze.",
      ),
    message: z
      .string()
      .describe(
        "A descriptive message or context for the getting build blocks request.",
      ),
  }),
  description:
    "Provides a detailed breakdown of the fundamental building blocks of an open-source package. " +
    "This includes core components, modules, utilities, and APIs that the package exposes for usage. " +
    "The tool retrieves detailed information about how the package is structured, such as its main entry points, key functionalities, and design patterns. " +
    "It highlights dependencies, peer dependencies, and other packages or frameworks it integrates with or relies on. " +
    "Additionally, it provides insights into the internal architecture, such as whether it follows specific principles (e.g., functional programming, modular design) or conventions (e.g., MVC, MVVM). " +
    "For developers, this tool is essential for understanding how to extend, customize, or integrate the package effectively into their projects. " +
    "It also includes links to relevant documentation, diagrams, or examples that clarify the structure and usage of these building blocks.",
};
type Args = z.infer<typeof packageBuildingBlocksToolDefinition.parameters>;

export const getBuildingBlocks: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { url, message } = toolArgs;
  const result = await getRepoIngest(url);
  if (result) {
    const { data } = result;
    const answer = await EmbeddingHandler.qa(message, data);
    return answer;
  }
};
