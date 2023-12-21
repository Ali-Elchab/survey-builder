import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/colors.css";
import AuthPage from "./pages/auth";
import RegisterForm from "./components/RegisterFrom";
import HomePage from "./pages/home";
import AddSurvey from "./pages/addSurvey";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/addSurvey" element={<AddSurvey />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
