import React from 'react';

const ScreenContext = React.createContext<{
  setScreen: (screen: string) => void;
}>({
  setScreen: () => {},
});

export default ScreenContext;
