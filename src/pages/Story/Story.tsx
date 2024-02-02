import React, { useEffect, useState } from "react";
import "./story.css";
import { useTranslation } from "react-i18next";
import henryPic from "../../assets/showcase/henryPic.jpg";
import glassesMaker2 from "../../assets/showcase/glassesMaker2.jpg";
import glassesMaker3 from "../../assets/showcase/glassesMaker3.jpg";
import test1 from "../../assets/showcase/test1.jpg";
import test2 from "../../assets/showcase/test2.jpg";
import test3 from "../../assets/showcase/test3.jpg";
import { useScreenSize } from "hooks";

const Story = () => {
  const [t, i18n] = useTranslation("global");
  let screenSize = useScreenSize();

  const [tabletDisplay, setTabletDispaly] = useState(false);

  useEffect(() => {
    if (screenSize.width >= 650) {
      setTabletDispaly(true);
    } else {
      setTabletDispaly(false);
    }
  }, [screenSize.width]);

  return (
    <div id="story-full-contanir">
      {tabletDisplay ? (
        <div id="story-contanir">
          <div id="story-section-one" className="story-section-contanir">
            <div className="paragraph-contanir">{t("story.p1")}</div>
            <img className="pic-contanir" src={henryPic} alt="henryPicalt" />
          </div>

          <div id="story-section-two" className="story-section-contanir">
            <img className="pic-contanir" src={test3} alt="test3Alt" />
            <div className="paragraph-contanir">{t("story.p2")}</div>
          </div>

          <div id="story-section-three" className="story-section-contanir">
            <div className="paragraph-contanir">{t("story.p3")}</div>
            <img className="pic-contanir" src={test2} alt="test2Alt" />
          </div>
        </div>
      ) : (
        <div id="story-contanir">
          <div id="story-section-one" className="story-section-contanir">
            <img className="pic-contanir" src={henryPic} alt="henryPicalt" />
            <div className="paragraph-contanir">{t("story.p1")}</div>
          </div>

          <div id="story-section-two" className="story-section-contanir">
            <img className="pic-contanir" src={test3} alt="test3Alt" />
            <div className="paragraph-contanir">{t("story.p2")}</div>
          </div>

          <div id="story-section-three" className="story-section-contanir">
            <img className="pic-contanir" src={test2} alt="test2Alt" />
            <div className="paragraph-contanir">{t("story.p3")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Story;
