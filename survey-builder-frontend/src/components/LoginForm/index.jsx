import React, { useState } from "react";
import InputField from "../common/InputField";
import "./style.css";
import Button from "../common/Button";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const HandleOnInputChange = (event) => {};
  return (
    <div className="form">
      <h2 className="flex center form-title">Sign In</h2>
      <div>
        <InputField
          name={"username"}
          text={"Username"}
          type={"text"}
          placeholder={"Type your username"}
          handleChange={HandleOnInputChange}
        />
        <InputField
          name={"password"}
          text={"Password"}
          type={"password"}
          placeholder={"Type your password"}
          handleChange={HandleOnInputChange}
        />
      </div>
      <Button text={"Sign In"} />
      <p>
        Dont have an account? <a href="/register">Register now</a>
      </p>
    </div>
  );
};

export default LoginForm;
