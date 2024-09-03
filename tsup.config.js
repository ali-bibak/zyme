import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    zyme: "src/index.ts",
  },
  format: "cjs",
  sourcemap: true,
  clean: true,
  esbuildOptions(options, context) {
    options.platform = "node";
  },
});
