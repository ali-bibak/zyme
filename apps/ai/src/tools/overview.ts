import { z } from "zod";

export const packageOverviewToolDefinition = {
  name: "package_overview",
  parameters: z.object({
    packageName: z
      .string()
      .describe(
        "The name of the open-source package to retrieve the overview for.",
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
