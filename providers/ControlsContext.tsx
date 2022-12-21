import * as React from "react";

interface ControlsContextInterface {
  controlsDisabled: boolean;
  setControlsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ControlsContextProps {
  children: React.ReactNode;
}

export const ControlsContext = React.createContext(
  {} as ControlsContextInterface
);

export const ControlsContextProvider = ({ children }: ControlsContextProps) => {
  const [controlsDisabled, setControlsDisabled] = React.useState(false);

  return (
    <ControlsContext.Provider value={{ controlsDisabled, setControlsDisabled }}>
      {children}
    </ControlsContext.Provider>
  );
};

// Custom hook to allow components to access the context
export const useControlsContext = () => {
  const context = React.useContext(ControlsContext);

  if (!context) {
    throw Error("useControlsContext must be inside a ControlsContextProvider");
  }

  return context;
};
