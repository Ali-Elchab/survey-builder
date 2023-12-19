import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import LoginForm from "../../components/LoginForm";

const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page flex center">
      <LoginForm />
    </div>
  );
};

export default AuthPage;
