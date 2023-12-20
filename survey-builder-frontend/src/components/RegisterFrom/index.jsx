import React, { useState } from "react";
import InputField from "../common/InputField";
import "./style.css";
import Button from "../common/Button";
import { requestData } from "../../core/axios";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/images/profile.png";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
    image: null,
    imageURL: pic,
  });

  const HandleOnInputChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const imageURL = file ? URL.createObjectURL(file) : pic;
      setValues({ ...values, image: file, imageURL });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleRegister = async () => {
    try {
      const res = await requestData("auth/register", "post", values);
      console.log("Success Response:", res.data);
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
        <h2 className="flex center form-title">Sign Up</h2>
        <div>
          <div className="flex column center">
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              <img src={values.imageURL} alt="Uploaded" />
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              onChange={HandleOnInputChange}
              style={{ display: "none" }}
            />
          </div>

          <InputField
            name={"name"}
            text={"Name"}
            type={"text"}
            // value={values.username}
            placeholder={"Type your name"}
            handleChange={HandleOnInputChange}
          />
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
        <Button text={"Sign Up"} handleOnClick={handleRegister} />
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
