import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
// import Login from "./Login.tsx";
import { Login } from "./Login";
import { Home } from "./app/pages/home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
