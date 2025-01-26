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
import { DownloadChamada } from "./app/pages/chamadas/download";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExportarChamada } from "./app/pages/exportar";
import { PageEstudantes } from "./app/pages/estudantes/page";
import { NotFound } from "./app/pages/notFound";
import { PrivateRoute } from "./components/privateRoute";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
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
          <Route index element={<Login />} />
          <Route path="camera" element={<Camera />} />

          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="iniciar"
            element={
              <PrivateRoute>
                <Iniciar />
              </PrivateRoute>
            }
          />
          <Route path="chamada">
            <Route
              index
              element={
                <PrivateRoute>
                  <Chamada />
                </PrivateRoute>
              }
            />
            <Route
              path="dowload"
              element={
                <PrivateRoute>
                  <DownloadChamada />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="estudantes"
            element={
              <PrivateRoute>
                <PageEstudantes />
              </PrivateRoute>
            }
          />
          <Route
            path="exportar"
            element={
              <PrivateRoute>
                <ExportarChamada />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
);
