import { defineConfig } from "vite";
import hydrogen from "@shopify/hydrogen/plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    hydrogen({
      // hydrogen plugin options can be placed here if needed
    }),
    tsconfigPaths(),
  ],
});