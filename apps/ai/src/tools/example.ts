import { z } from "zod";

export const packageExamplesToolDefinition = {
  name: "package_examples",
  parameters: z.object({
    packageName: z
      .string()
      .describe(
        "The name of the open-source package for which examples are to be generated.",
      ),
    feature: z
      .string()
      .optional()
      .describe(
        "A specific feature or functionality to create an implementation example for. If omitted, examples for the main features will be provided.",
      ),
  }),
  description:
    "Generates practical examples of implementing the main features and architectural patterns of an open-source package. " +
    "This tool provides step-by-step code snippets and usage demonstrations to help developers understand how to utilize the package effectively in real-world scenarios. " +
    "Examples include key functionalities, such as setup, configuration, and usage of core APIs, as well as best practices for integrating the package into projects. " +
    "For packages with architectural patterns, the tool illustrates how to adopt these patterns with clear, concise examples. " +
    "It also highlights common use cases, advanced techniques, and potential pitfalls, enabling developers to maximize the package's potential. " +
    "Each example is accompanied by detailed explanations, making it suitable for both beginners and experienced developers. Links to relevant documentation or resources are also provided for further exploration.",
};
