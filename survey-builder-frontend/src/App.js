import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import AuthPage from "./pages/auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
