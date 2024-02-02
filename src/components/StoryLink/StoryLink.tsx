import React from "react";
import { useTranslation } from "react-i18next";
import storyLinkImg from "../../assets/showcase/storylink.jpg";
import "./storylink.css";
import { useNavigate } from "react-router-dom";

const StoryLink = () => {
  const backgroundImage = {
    backgroundImage: `url(${storyLinkImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [t] = useTranslation("global");
  const navigate = useNavigate();

  const handelClick = () => {
    navigate("/story");
  };

  return (
    <div
      id="story-link-container"
      style={backgroundImage}
      onClick={handelClick}
    >
      <p id="story-link-p">{t(`storylink.p`)}</p>
    </div>
  );
};

export default StoryLink;
