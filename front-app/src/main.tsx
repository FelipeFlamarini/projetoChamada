import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Login } from "./app/pages/Login";
import { Home } from "./app/pages/home";
import { Camera } from "./app/pages/camera";
import { Iniciar } from "./app/pages/iniciar";
import { Toaster } from "sonner";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { Teste } from "./app/pages/teste";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-center"
        expand={true}
        visibleToasts={1}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="camera" element={<Camera />} />
          <Route path="iniciar" element={<Iniciar />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
  // </StrictMode>
);
