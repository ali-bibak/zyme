import { z } from "zod";

// Types
import type { ToolFn } from "../../../types";

// Services
import EmbeddingHandler from "../../services/Embedding";

// Ingest
import { getRepoIngest } from "./../../utils/ingest";

export const packageExamplesToolDefinition = {
  name: "package_examples",
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
  description: "Get building blocks of sources code",
};

type Args = z.infer<typeof packageExamplesToolDefinition.parameters>;

export const getExamples: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { url, message } = toolArgs;
  const result = await getRepoIngest(url);
  if (result) {
    const { data } = result;
    const answer = await EmbeddingHandler.qa(message, data);
    return answer;
  }
};
