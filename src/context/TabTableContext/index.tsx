import { Movie } from "@/types";
import React, { createContext } from "react";

interface TabTableContextInterface {
  movieData: Array<Movie>;
}

export const TabTableContext = createContext<TabTableContextInterface>({
  movieData: [],
});

interface TabTableContextProviderProp {
  movieData: Array<Movie>;
  children: React.ReactNode;
}

function TabTableContextProvider({
  movieData,
  children,
}: TabTableContextProviderProp) {
  return (
    <TabTableContext.Provider value={{ movieData }}>
      {children}
    </TabTableContext.Provider>
  );
}

export default TabTableContextProvider;
