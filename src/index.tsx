import "./index.css";

import { ThemeProvider } from "@mui/material/styles";
import ErrorBoundary from "lib/error-boundary/errorBoundary";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { muiTheme } from "./global/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <React.StrictMode>
    <Helmet defaultTitle="TITLE" titleTemplate="%s | TITLE" />
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={null}>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  duration: 3000,
                  loading: {
                    duration: 1000,
                  },
                }}
              />
              <App />
            </Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
