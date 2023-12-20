import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
export const SurveyCard = ({ survey, index }) => {
  const navigate = useNavigate();
  return (
    <div className="survey-card" onClick={() => navigate(`/survey/${survey._id}`)}>
      <h2>{survey.title}</h2>
      <p>{survey.questions.length} questions</p>
    </div>
  );
};
