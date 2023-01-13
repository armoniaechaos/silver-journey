import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

const { Button, Modal, Card, Link, Tooltip, NumberInput } =
  chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Modal,
    Card,
    Link,
    Tooltip,
    NumberInput,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraBaseProvider>
  </React.StrictMode>
);
