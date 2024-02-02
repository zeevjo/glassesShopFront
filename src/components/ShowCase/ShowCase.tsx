import React, { useState, useEffect } from 'react';
import './showcase.css'; // Import your CSS file
import { useTranslation } from 'react-i18next';
import {useScreenSize} from 'hooks'
import "./showcase.css";
import { Link } from 'react-router-dom';

interface ImageSliderProps {
  imageLinks: string[];
}

const ShowCase: React.FC<ImageSliderProps> = ({ imageLinks }) => {
  const [t, i18n] = useTranslation("global");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {width} = useScreenSize()
  


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [imageLinks]);

  const currentImage = imageLinks[currentImageIndex];

  // const handleButtonClick = () => {
  //   // Change the route when the button is clicked
  //   const newUrl = '/new-route';
  //   window.history.replaceState(null, "null", newUrl);
  // };

  return (
    <div className="slider">
      <div className="image-snapshot" style={{ backgroundImage: `url(${currentImage})` }}>
        <Link id='showcase-shop-button' type="button" to={'/shop'}>{t(`showcase.shop-now`)}</Link>
        {/* <button onClick={handleButtonClick}>test</button> */}
      </div>
    </div>
  );
};

export default ShowCase;


// {t(`navbar.${curr.translateJsonKey}`)}
