import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import Index from "./jsx";

const client = new ApolloClient({
  uri: "https://iverify-api-74759ca6a9f2.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeContext>
          <Index />
        </ThemeContext>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
