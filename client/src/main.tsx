import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
// import Login from "./Login.tsx";
import { Login } from "./Login";
import { Home } from "./app/pages/home";
import { Camera } from "./app/pages/camera";
import { Toaster } from "sonner";
// import { Teste } from "./app/pages/teste";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <Toaster richColors position="top-center" expand={true} />
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="camera" element={<Camera />} />
        {/* <Route path="teste" element={<Teste />} /> */}
      </Routes>
    </BrowserRouter>
  </>
  // </StrictMode>
);
