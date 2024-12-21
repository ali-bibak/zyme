import fetch from "node-fetch";
import { z } from "zod";
import type { ToolFn } from "../../types";

export const dadJokeToolDefinition = {
  name: "dad_joke",
  parameters: z.object({}),
  description: "get a dad joke",
};

type Args = z.infer<typeof dadJokeToolDefinition.parameters>;

export const dadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });

  return (await res.json()).joke;
};