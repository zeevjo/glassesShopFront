import React from "react";
import {
  CustomParagraph,
  Footer,
  FrontViewModels,
  NavBar,
  ShowCase,
  StoryLink,
} from "components";
import { customParagraphProps, navbarProps } from "interfaces";
import showcase_two_1 from "../../assets/showcase/test.jpg";
import showcase_two from "../../assets/showcase/showcase-two.jpg";
import showcase_three from "../../assets/showcase/shwcase-three.jpg";
import show_case_4 from "../../assets/showcase/show_case_4.jpg";
import { customParagraphsStrs } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faGlasses,
  faL,
  faR,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { FaRegCircle } from "react-icons/fa6";

const Home: React.FC<navbarProps> = ({ navItems }) => {
  const tempArray = [showcase_two, showcase_two_1, showcase_three, show_case_4];

  return (
    <div>
      <ShowCase imageLinks={tempArray}></ShowCase>
      <CustomParagraph customParagraphStr={customParagraphsStrs.str1} />
      <FrontViewModels />

      <CustomParagraph customParagraphStr={customParagraphsStrs.str2} />

      <StoryLink />

      {/* <Footer/> */}
      {/* <Collections/> */}
    </div>
  );
};

export default Home;
