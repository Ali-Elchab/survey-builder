import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import profile from "../../assets/images/profile.png";
import "./style.css";
import { requestData } from "../../core/axios";
import { SurveyCard } from "../../components/common/SurveyCard";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: token,
    };
    if (!token) {
      console.error("Token not available");
      return;
    }

    const fetchSurveys = async () => {
      setLoading(true);
      const res = await requestData("surveys/", "GET", {}, headers);

      if (res.status === 200) {
        setSurveys(res.data.surveys);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };
    fetchSurveys();
  }, []);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userType = userData ? userData.type : null;

  return (
    <div className="flex column center ">
      <Navbar />
      <div className="flex column  content ">
        <div className="flex group">
          <h1>{userType === "admin" ? "Admin Portal" : "User Portal"}</h1>
          {userType === "admin" ? (
            <Button
              text={"Add survey"}
              handleOnClick={() => {
                navigate("/addSurvey");
              }}
              className={"add-survey-btn"}
            />
          ) : null}
        </div>
        <div className="surveys-container flex">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            surveys.map((survey, index) => {
              return <SurveyCard key={index} survey={survey} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
