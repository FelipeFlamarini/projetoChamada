// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Login } from "./app/pages/login";
import { Home } from "./app/pages/home";
import { Camera } from "./app/pages/camera";
import { Iniciar } from "./app/pages/iniciar";
import { Toaster } from "sonner";
import { Chamada } from "./app/pages/chamadas/chamada";
import { DowloadChamada } from "./app/pages/chamadas/dowload";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExportarChamada } from "./app/pages/exportar";
import { PageEstudantes } from "./app/pages/estudantes/page";
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
          <Route path="chamada">
            <Route index element={<Chamada />} />
            <Route path="dowload" element={<DowloadChamada />} />
          </Route>
          <Route path="estudantes" element={<PageEstudantes />} />
          <Route path="exportar" element={<ExportarChamada />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
  // </StrictMode>
);
