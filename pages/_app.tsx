import "styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "components/Layout";
import { GapiContextProvider } from "providers/GapiContext";
import { Auth0Provider } from "@auth0/auth0-react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="dev-c0yb5cr7.us.auth0.com"
      clientId="mJvb9a6rBcUFG9UnkLDwt8ODyCACYFsI"
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
        audience: "https://auth0-jwt-authorizer",
      }}
    >
      <GapiContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </GapiContextProvider>
    </Auth0Provider>
  );
}
