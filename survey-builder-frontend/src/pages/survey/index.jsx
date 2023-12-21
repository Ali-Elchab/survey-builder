import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { requestData } from "../../core/axios";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const Survey = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [responses, setResponses] = useState([]);
  const [answer, setAnswer] = useState({ questionId: "", answer: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: token };
    if (!token) {
      console.error("Token not available");
      return;
    }
    const getSurvey = async () => {
      const res = await requestData(`surveys/${id}`, "GET", {}, headers);
      if (res.status === 200) {
        setQuestions(res.data.survey.questions);
        setTitle(res.data.survey.title);
      }
    };

    getSurvey();
  }, []);

  const handleSubmitClick = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: token };
    try {
      const res = await requestData(`answers/`, "post", { id, responses }, headers);
      if (res.status === 201) {
        console.log("Answer submitted successfully");
        navigate("/home");
      }
    } catch (err) {
      console.log("Errorrrrrrr", err);
    }
  };

  const HandleOnInputChange = (e, questionId) => {
    const { value } = e.target;

    setAnswer({ questionId: questionId, answer: value });

    // Update responses using functional form of setResponses
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter((response) => response.questionId !== questionId);
      return [...updatedResponses, { questionId: questionId, answer: value }];
    });
  };
  const handleResetClick = () => {
    setResponses([]);
    setAnswer({ questionId: "", answer: "" });
    window.location.reload();
  };

  const userType = localStorage.getItem("role");

  return (
    <div>
      <Navbar />
      <div className="page flex column  center add-survey">
        <div className="add-survey-form">
          <h1>{title}</h1>

          <h3>Questions:</h3>

          <div className="questions flex column">
            {questions.map((question, index) => {
              if (question.type === "text") {
                return (
                  <InputField
                    key={index}
                    name={question.questionText}
                    text={`${index}- ${question.questionText}`}
                    type={"text"}
                    placeholder={"Type answer here"}
                    handleChange={(e) => HandleOnInputChange(e, question._id)}
                    required={true}
                  />
                );
              } else if (question.type === "radio") {
                return (
                  <div key={index} className="radio">
                    <h4>{`${index}- ${question.questionText}`}</h4>
                    {question.options.map((option, i) => {
                      return (
                        <div key={i}>
                          <input
                            type="radio"
                            id={option}
                            name={question.questionText}
                            value={option}
                            onChange={(e) => {
                              HandleOnInputChange(e, question._id);
                            }}
                          />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (question.type === "checkbox") {
                return (
                  <div key={index} className="checkbox">
                    <h4>{`${index}- ${question.questionText}`}</h4>
                    {question.options.map((option, i) => {
                      return (
                        <div key={i}>
                          <input
                            type="checkbox"
                            id={option}
                            name={question.questionText}
                            value={option}
                            onChange={(e) => {
                              HandleOnInputChange(e, question._id);
                            }}
                          />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return null; // Add this line to return a value at the end of the arrow function
            })}
          </div>

          <Button text={"Reset"} handleOnClick={handleResetClick} className={"reset-btn"} />
          <Button text={"Submit answer"} handleOnClick={handleSubmitClick} />
        </div>
        ;
      </div>
      ;
    </div>
  );
};

export default Survey;
