import { createContext, type ReactNode, useContext } from "react";

const StorySourceContext = createContext<string | undefined>(undefined);

export function StorySourceProvider({
  children,
  source,
}: {
  children: ReactNode;
  source?: string;
}) {
  return <StorySourceContext.Provider value={source}>{children}</StorySourceContext.Provider>;
}

export function useStorySource() {
  return useContext(StorySourceContext);
}
