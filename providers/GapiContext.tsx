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
    // Initialises an instance of the GAPI client using the provided API key. If OAuth is required, these credentials may be provided here.
    const initialiseGapi = () => {
      gapi.client
        .init({
          apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        })
        // TODO: Determine what to do here
        .then(() => console.log("GAPI initialised"))
        .catch((err) => console.log(err));
    };

    // Check that the GAPI script has loaded and is available. Because of the server-side rendering, theoretically there shouldn't be a case where this hook is called before the GAPI script has initialised?
    if (typeof gapi === "undefined") {
      // TODO: Determine what to do here
      console.error("GAPI script unavailable");
    } else {
      if (!gapiClientReady) {
        // GAPI client has not previously been initialised
        gapi.load("client", initialiseGapi);
        setGapiClientReady(true);
      }
    }
  }, [gapiClientReady]);

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
