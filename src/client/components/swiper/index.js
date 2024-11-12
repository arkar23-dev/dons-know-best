import React, { useState, useRef, useEffect } from "react";
import swiperCss from "./swiper.css";

const Swiper = ({ children, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const scrollTimeout = useRef(null);

  const dataLength = React.Children.count(children);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold && currentIndex < dataLength - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (swipeDistance < -swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // scroll event handler
  const handleWheel = (e) => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      if (e.deltaY > 20 && currentIndex < dataLength - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (e.deltaY < -20 && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }, 50);
  };

  useEffect(() => {
    // Add wheel event listener
    window.addEventListener("wheel", handleWheel);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [currentIndex]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={swiperCss.swipeable_container}
      {...props}
    >
      <div
        className={swiperCss.swipeable_content}
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
          transition: "transform 0.4s ease-out",
        //   transition: "transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

function SwiperItem({ children, ...props }) {
  return (
    <div className={swiperCss.swipeable_item} {...props}>
      {children}
    </div>
  );
}

export { Swiper, SwiperItem };
