import React, { useState } from "react";
import InputField from "../common/InputField";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const HandleOnInputChange = (event) => {};
  return (
    <div className="form">
      <InputField
        name={"username"}
        text={"Username"}
        type={"text"}
        value={loginForm.username}
        handleChange={HandleOnInputChange}
      />
      <InputField
        name={"username"}
        text={"Username"}
        type={"text"}
        value={loginForm.username}
        handleChange={HandleOnInputChange}
      />
    </div>
  );
};

export default LoginForm;
