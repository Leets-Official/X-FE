"use client"

import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type TabContextType = {
  tab: 'rec' | 'fol';
  setTab: Dispatch<SetStateAction<'rec' | 'fol'>>;
};

export const TabContext = createContext<TabContextType>({
  tab: 'rec',
  setTab: () => {},
});

type Props = { children: ReactNode };

export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<'rec' | 'fol'>('rec');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
