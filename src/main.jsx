import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import publicRoutes from "./routes/publicRoutes";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={publicRoutes}></RouterProvider>
    <ToastContainer></ToastContainer>
  </StrictMode>,
);
