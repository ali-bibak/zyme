import { z } from "zod";

export const packageBuildingBlocksToolDefinition = {
  name: "package_building_blocks",
  parameters: z.object({
    packageName: z
      .string()
      .describe("The name of the open-source package to analyze."),
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
