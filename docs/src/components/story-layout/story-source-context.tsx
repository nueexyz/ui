import { createContext, type ReactNode, useContext } from "react";

type ColorMode = "dark" | "light";

const StorySourceContext = createContext<{
  colorMode: ColorMode;
  source?: string;
}>({ colorMode: "light" });

export function StorySourceProvider({
  children,
  colorMode,
  source,
}: {
  children: ReactNode;
  colorMode: ColorMode;
  source?: string;
}) {
  return (
    <StorySourceContext.Provider value={{ colorMode, source }}>
      {children}
    </StorySourceContext.Provider>
  );
}

export function useStorySource() {
  return useContext(StorySourceContext).source;
}

export function useStoryColorMode() {
  return useContext(StorySourceContext).colorMode;
}
