import React, { createContext, useState } from 'react';

export const VersionAdapter = createContext();

export const VersionAdapterProvider = ({ children, version = null }) => {
  const [versionAdapter, setVersionAdapter] = useState(version);

  const changeVersion = (newVersion) => {
    setVersionAdapter(newVersion);
  }

  return (
    <VersionAdapter.Provider version={versionAdapter} setVersion={changeVersion}>
      {children}
    </VersionAdapter.Provider>
  )
}