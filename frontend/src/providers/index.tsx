import {
  ApolloClient as ApolloCLient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { env } from "../env";

export type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Providers
 * @param children
 * @returns React.ReactNode
 * @example
 * ```tsx
 * <Providers>
 *   <App />
 * </Providers>
 * ```
 */
export const Providers = ({ children }: ProvidersProps) => {
  // Apollo client
  const graphQLClient = new ApolloCLient({
    uri: env.VITE_APP_API_URL + "/graphql",
    cache: new InMemoryCache(),
    credentials: "include",
  });

  console.info(
    `App started in '${env.MODE}' mode with 'SSR' ${
      env.SSR ? "enabled" : "disabled"
    }.`
  );

  return (
    <BrowserRouter>
      <ApolloProvider client={graphQLClient}>
        <Toaster /> {/* Toaster */}
        {children}
      </ApolloProvider>
    </BrowserRouter>
  );
};
