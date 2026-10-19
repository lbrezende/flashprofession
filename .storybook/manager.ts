import { addons } from "storybook/manager-api";
import { FONTE_DISPLAY_FALLBACK, FONTE_FALLBACK, temaStorybook } from "./tema";

// A casca do Storybook é outra página, fora do iframe das stories: precisa da
// mesma fonte declarada ali para o `var(--font-inter)` do tema resolver.
document.documentElement.style.setProperty("--font-inter", FONTE_FALLBACK);
document.documentElement.style.setProperty("--font-dm-sans", FONTE_FALLBACK);
document.documentElement.style.setProperty(
  "--font-geist",
  FONTE_DISPLAY_FALLBACK,
);

addons.setConfig({
  theme: temaStorybook,
  sidebar: {
    showRoots: true,
  },
});
