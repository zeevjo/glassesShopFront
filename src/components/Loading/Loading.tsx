import React from "react";
import { FaGlasses } from "react-icons/fa6";
import './loading.css'

const Loading = () => {
  console.log("i'm loading...");
  
  return (
    <div id="loading-container-app">
      <FaGlasses id="glasses-loading-icon" />
    </div>
  );
};

export default Loading;
