import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient as ApolloCLient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { Toaster } from "react-hot-toast";

export type ProvidersProps = {
  children: React.ReactNode;
};

const graphQLClient = new ApolloCLient({
  // TODO: change uri to env apointement
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <ApolloProvider client={graphQLClient}>
        {/* Toaster */}
        <Toaster />
        {children}
      </ApolloProvider>
    </BrowserRouter>
  );
};
