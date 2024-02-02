import React from "react";
import { useTranslation } from "react-i18next";
import "./customparagraph.css";

interface CustomParagraphProps {
  customParagraphStr: string;
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({
  customParagraphStr,
}) => {
  const [t] = useTranslation("global");

  return (
    <div className="custom-paragraph-container">
      <div className="designed-line-one"></div>

      <div className="paragraph-container">
        <p className="paragraph">
          {t(`customparagraph.${customParagraphStr}`)}
        </p>
      </div>

      <div className="designed-line-two"></div>
    </div>
  );
};

export default CustomParagraph;
