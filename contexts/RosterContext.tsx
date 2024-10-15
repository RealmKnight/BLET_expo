import React, { createContext, useState, useContext } from 'react';

const RosterContext = createContext({
  shouldUpdateRoster: false,
  triggerRosterUpdate: () => {},
});

export const RosterProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldUpdateRoster, setShouldUpdateRoster] = useState(false);

  const triggerRosterUpdate = () => {
    setShouldUpdateRoster(true);
  };

  return (
    <RosterContext.Provider value={{ shouldUpdateRoster, triggerRosterUpdate }}>
      {children}
    </RosterContext.Provider>
  );
};

export const useRoster = () => useContext(RosterContext);
