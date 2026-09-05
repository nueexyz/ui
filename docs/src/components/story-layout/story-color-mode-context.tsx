import { createContext, type ReactNode, useContext } from "react";

type ColorMode = "dark" | "light";

const StoryColorModeContext = createContext<{
  colorMode: ColorMode;
}>({ colorMode: "light" });

export function StoryColorModeProvider({
  children,
  colorMode,
}: {
  children: ReactNode;
  colorMode: ColorMode;
}) {
  return (
    <StoryColorModeContext.Provider value={{ colorMode }}>
      {children}
    </StoryColorModeContext.Provider>
  );
}

export function useStoryColorMode() {
  return useContext(StoryColorModeContext).colorMode;
}
