import * as React from "react";

const intialState = {
  theaterMode: false,
};

type ReducerState = typeof intialState;

export type ACTIONTYPE = { type: "toggle-theater-mode" };

function reducer(state: typeof intialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "toggle-theater-mode":
      return { theaterMode: !state.theaterMode };

    default:
      throw new Error("Invalid dispath action");
  }
}

interface PlayerContextInterface extends ReducerState {
  dispatch: React.Dispatch<ACTIONTYPE>;
}

interface PlayerContextProps {
  children: React.ReactNode;
}

export const PlayerContext = React.createContext({} as PlayerContextInterface);

export const PlayerContextProvider = ({ children }: PlayerContextProps) => {
  const [state, dispatch] = React.useReducer(reducer, intialState);

  return (
    <PlayerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to allow components to access the context
export const usePlayerContext = () => {
  const context = React.useContext(PlayerContext);

  if (!context) {
    throw Error("usePlayerContext must be inside a PlayerContextProvider");
  }

  return context;
};
