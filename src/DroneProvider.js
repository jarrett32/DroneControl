import React, {useState, createContext} from 'react';

export const DroneContext = React.createContext();

export const DroneProvider = ({children}) => {
  const [ip, setIp] = useState(null);
  const [name, setName] = useState(null);
  const [connected, setConnected] = useState(false);

  return (
    <DroneContext.Provider
      value={{ip, setIp, name, setName, connected, setConnected}}>
      {children}
    </DroneContext.Provider>
  );
};
