import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import LoginForm from "../../components/LoginForm";
import "./style.css";

const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default AuthPage;
