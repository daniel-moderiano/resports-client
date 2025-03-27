import * as React from "react";

interface GapiContextInterface {
  gapiClientReady: boolean;
  setGapiClientReady: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GapiContextProps {
  children: React.ReactNode;
}

// Create an instance of React Context. Default GAPI loaded state should be false until the API has loaded.
export const GapiContext = React.createContext({} as GapiContextInterface);

// Provide an indication of whether the GAPI client is ready to make API requests or not
export const GapiContextProvider = ({ children }: GapiContextProps) => {
  // gapiClientReady is the key boolean value that will be required by most YouTube-related components. The setGapi function is required by the GAPI initialisation component only
  const [gapiClientReady, setGapiClientReady] = React.useState(false);

  React.useEffect(() => {
    const initialiseGapi = () => {
      gapi.client
        .init({
          apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        })
        .then(() => {
          console.log("GAPI initialised");
          setGapiClientReady(true);
        })
        .catch((err) => console.error("GAPI init failed", err));
    };

    const waitForGapi = () => {
      if (typeof window === "undefined") {
        // SSR guard
        return;
      }
      if (typeof gapi === "undefined" || !gapi.load) {
        console.warn("GAPI not yet loaded, retrying...");
        setTimeout(waitForGapi, 100); // Try again in 100ms
      } else {
        gapi.load("client", initialiseGapi);
      }
    };

    waitForGapi();
  }, []);

  return (
    <GapiContext.Provider value={{ gapiClientReady, setGapiClientReady }}>
      {children}
    </GapiContext.Provider>
  );
};

// Custom hook to allow components to access the context
export const useGapiContext = () => {
  const context = React.useContext(GapiContext);

  // Can optionally add conditional here to ensure GAPI context is used only by those components wrapped in a GAPI context provider

  return context;
};
