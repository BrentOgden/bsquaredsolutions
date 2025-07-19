import React, { useState, useEffect } from 'react';
import arrowUp from '../assets/arrowup.png';
import '../scrollToTopArrow.css'; // Import the CSS file for styling

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Arrow appears after 300px of scrolling
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`scroll-to-top-arrow ${visible ? 'active' : ''}`} onClick={scrollToTop}>
      <img src={arrowUp} />
    </div>
  );
};

export default ScrollToTop;
