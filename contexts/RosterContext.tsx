import React, { createContext, useContext, useState } from 'react';

interface RosterContextType {
  shouldUpdateRoster: boolean;
  triggerRosterUpdate: () => void;
}

const RosterContext = createContext<RosterContextType | undefined>(undefined);

export function RosterProvider({ children }: { children: React.ReactNode }) {
  const [shouldUpdateRoster, setShouldUpdateRoster] = useState(false);

  const triggerRosterUpdate = () => {
    setShouldUpdateRoster((prev) => !prev);
  };

  return (
    <RosterContext.Provider value={{ shouldUpdateRoster, triggerRosterUpdate }}>
      {children}
    </RosterContext.Provider>
  );
}

export function useRoster() {
  const context = useContext(RosterContext);
  if (context === undefined) {
    throw new Error('useRoster must be used within a RosterProvider');
  }
  return context;
}
