import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import Index from "./jsx";
import ApolloProvider from "./ApolloProvider";
import { AuthProvider, AuthContext } from "./context-auth/auth";

/*function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/react/demo">
        <ThemeContext>
          <Index />
        </ThemeContext>
      </BrowserRouter>
    </AuthProvider>
  );
}*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(ApolloProvider);
