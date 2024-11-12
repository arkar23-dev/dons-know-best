import React, { useState, useRef, useEffect } from "react";
import swiperCss from "./swiper.css";

const Swiper = ({ children, loadMore, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

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

    if (swipeDistance > swipeThreshold && currentIndex + 1 === dataLength) {
      loadMore();
    }

    if (swipeDistance > swipeThreshold && currentIndex < dataLength - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (swipeDistance < -swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleScroll =(e)=>{
    console.log('hi')
  }

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

function SwiperItem({ children, loading,...props }) {
  return (
    <div className={swiperCss.swipeable_item} {...props}>
      {children}
      <div>{loading ? "Loading" : undefined}</div>
    </div>
  );
}

export { Swiper, SwiperItem };
