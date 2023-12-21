import React, { useState } from "react";
import InputField from "../common/InputField";
import "./style.css";
import Button from "../common/Button";
import { requestData } from "../../core/axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const HandleOnInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log("Success Response:", values);
  const handleLogin = async () => {
    try {
      const res = await requestData("auth/login", "post", values, {});
      const { token } = res.data;

      if (token) {
        localStorage.setItem("token", `Bearer ${token}`);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Error Message:", error.response.data.message);
      } else {
        console.log("Unknown Error Occurred");
      }
    }
  };

  return (
    <div className="page flex center auth">
      <form className="form">
        <h2 className="flex center form-title">Sign In</h2>
        <div>
          <InputField
            name={"username"}
            text={"Username"}
            type={"text"}
            // value={values.username}
            placeholder={"Type your username"}
            handleChange={HandleOnInputChange}
          />
          <InputField
            name={"password"}
            text={"Password"}
            type={"password"}
            // value={values.password}
            placeholder={"Type your password"}
            handleChange={HandleOnInputChange}
          />
        </div>
        <Button text={"Sign In"} handleOnClick={handleLogin} />
        <p>
          Dont have an account? <a href="/register">Register now</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
