import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const uiEntry = fileURLToPath(import.meta.resolve("@cachette/ui"));
const tokensEntry = fileURLToPath(import.meta.resolve("@cachette/tokens"));

export const uiSourceDirectory = dirname(uiEntry);
export const tokensSourceDirectory = dirname(tokensEntry);

export const dependencyVersions = {
  "@base-ui/react": "^1.7.0",
  "@phosphor-icons/react": "^2.1.10",
  "@stylexjs/stylex": "^0.19.0",
};
