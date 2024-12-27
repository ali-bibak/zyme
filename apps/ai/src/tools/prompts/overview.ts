import { z } from "zod";

// Types
import type { ToolFn } from "../../../types";

// Services
import EmbeddingHandler from "../../services/Embedding";

// Ingest
import { getRepoIngest } from "./../../utils/ingest";

export const packageOverviewToolDefinition = {
  name: "package_overview",
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
    "Provides a comprehensive overview of an open-source package by analyzing its purpose, primary use cases, and key features. " +
    "This tool retrieves critical information such as installation instructions, typical usage examples, and compatibility with specific ecosystems or frameworks. " +
    "It also includes essential links, such as the package's GitHub repository, official documentation, npm (or other package managers) page, and any community resources. " +
    "The tool highlights the development status (e.g., actively maintained, deprecated, or experimental), current version, and community support options like forums, discussions, or Slack channels. " +
    "Additionally, it outlines any known limitations, prerequisites, or dependencies to help users quickly assess the package's suitability for their projects. " +
    "This makes it an ideal tool for evaluating open-source tools, comparing alternatives, and integrating the right solutions into your workflows.",
};

type Args = z.infer<typeof packageOverviewToolDefinition.parameters>;

export const getOverview: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { url, message } = toolArgs;
  const result = await getRepoIngest(url);
  if (result) {
    const { data } = result;
    const answer = await EmbeddingHandler.qa(message, data);
    return answer;
  }
};
