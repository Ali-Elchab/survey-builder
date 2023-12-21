import React, { useEffect, useState } from "react";
import "./style.css";
import { requestData } from "../../core/axios";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/images/profile.png";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import Navbar from "../../components/common/Navbar";

const AddSurvey = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("text");
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({ questionText: "", type: "text", options: [] });
  const [survey, setSurvey] = useState({ title: "", questions: questions });
  const [error, setError] = useState("");

  const HandleOnInputChange = (e) => {
    setSurvey({ ...survey, [e.target.name]: e.target.value });
    setError("");
  };

  const HandleQuestionChange = (e) => {
    if (e.target.name === "options") {
      setQuestion({ ...question, [e.target.name]: e.target.value.split(",") });
      return;
    }
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const HandleTypeChange = (e) => {
    setQuestion({ ...question, type: e.target.value });
    setType(e.target.value);
  };

  const HandleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
    setSurvey((prevSurvey) => ({ ...prevSurvey, questions: [...prevSurvey.questions, question] }));
    // Clear the question after adding
    // setQuestion({ questionText: "", type: "text", options: [] });
  };

  const HandleAddSurvey = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: token };
    const response = await requestData("surveys", "post", survey, headers);
    if (response.status === 201) {
      navigate("/home");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page flex column  center add-survey">
        <div className="add-survey-form">
          <h1>Add Survey</h1>

          <InputField
            name={"title"}
            text={"Survey Title"}
            type={"text"}
            placeholder={"Type survey title"}
            handleChange={HandleOnInputChange}
          />

          <h2 className="questions-title">Questions</h2>

          <h4>Add a question:</h4>

          <InputField
            name={"questionText"}
            text={"Question"}
            type={"text"}
            placeholder={"Type your question here"}
            handleChange={HandleQuestionChange}
          />

          <div className="question-type">
            <label htmlFor="type">Question type :</label>
            <select name="type" id="type" onChange={HandleTypeChange}>
              <option value="text">Text</option>
              <option value="radio">Radio Buttons</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>

          {type !== "text" ? (
            <InputField
              name={"options"}
              text={"Options:"}
              type={"text"}
              placeholder={"option 1,oprtion 2,option 3..."}
              handleChange={HandleQuestionChange}
            />
          ) : null}

          <Button text={"Add Question"} className={"add-question"} handleOnClick={HandleAddQuestion} />
          <Button text={"Add Survey"} handleOnClick={HandleAddSurvey} />
        </div>
      </div>
    </div>
  );
};

export default AddSurvey;
