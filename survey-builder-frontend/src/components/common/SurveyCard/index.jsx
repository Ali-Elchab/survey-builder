import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { requestData } from "../../../core/axios";
export const SurveyCard = ({ survey, index }) => {
  const navigate = useNavigate();
  const type = localStorage.getItem("userType");
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  const handleResetButton = async (e) => {
    e.stopPropagation();
    const res = await requestData("answers", "GET", survey._id, headers);
    if (res.status === 200) {
      console.log("Survey reset successfully");
    }
  };

  const handleDeleteButton = async (e) => {
    e.stopPropagation();
    const res = await requestData("surveys", "delete", survey._id, headers);
    if (res.status === 200) {
      console.log("Survey reset successfully");
    }
  };

  return (
    <div className="survey-card" onClick={() => navigate(`/survey/${survey._id}`)}>
      <h2>{survey.title}</h2>
      <div className="flex card-bottom">
        <p>{survey.questions.length} questions</p>
      </div>
      <Button
        text={type === "admin" ? "Delete" : "Reset"}
        className={"reset-survey-btn"}
        handleOnClick={type === "admin" ? handleDeleteButton : handleResetButton}
      />
    </div>
  );
};
