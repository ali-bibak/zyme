import { z } from "zod";

import { runAgent } from "../agent";
import { tools } from "../tools";

// Types
import type { Request, Response } from "express";

const querySchema = z.object({
  message: z.string().nonempty("The 'message' query parameter is required."),
});

export const qa = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedQuery = querySchema.parse(req.query);
    const { message } = parsedQuery;
    const reply: any = await runAgent({ userMessage: message, tools });
    const processedReply = processReply(reply);

    res.status(200).json({
      success: true,
      message: processedReply,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message).join(", "),
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "An unexpected error occurred.",
    });
  }
};

type ReplyEntry = {
  role: "assistant" | "tool";
  content?: string;
  audio?: null;
};

function processReply(reply: ReplyEntry[]): string {
  let responseContent = "";

  reply.forEach((entry) => {
    if (entry.role === "assistant" && entry.content) {
      responseContent += `${entry.content}\n`;
    }

    if (entry.role === "tool" && entry.content) {
      responseContent += `${entry.content}\n`;
    }
  });

  return responseContent.trim() || "No content available from the assistant.";
}
