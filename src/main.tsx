import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonPage from "./components/pages/PokemonPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
