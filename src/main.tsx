import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "./router/router";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 30000,
      staleTime: 10000,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer theme="colored" position="bottom-center" />
  </QueryClientProvider>
);
