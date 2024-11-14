import React, { useState, useRef, useEffect, useCallback } from "react";
import swiperCss from "./swiper.css";

const SWIPE_THRESHOLD = 50;

const Swiper = ({ children, loadMore, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const touchStartX = useRef(0);
  const timeoutRef = useRef(null);

  const dataLength = React.Children.count(children);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    // Only update Y values if primarily vertical to save processing
    if (Math.abs(touchStartX.current - e.touches[0].clientX) < Math.abs(touchStartY.current - e.touches[0].clientY)) {
      touchEndY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = useCallback(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const swipeDistanceY = touchStartY.current - touchEndY.current;

      if (swipeDistanceY > SWIPE_THRESHOLD && currentIndex < dataLength - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (swipeDistanceY < -SWIPE_THRESHOLD && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }

      if (swipeDistanceY > SWIPE_THRESHOLD && currentIndex + 1 === dataLength) {
        loadMore();
      }
    }, 80); // Shorter debounce for quicker response
  }, [currentIndex, dataLength, loadMore]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // Cleanup on unmount
  }, []);

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
          transition: "transform 0.5s cubic-bezier(0.4, 0.8, 0.6, 1)",
        }}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { key: `swiper-item-${index}` })
        )}
      </div>
    </div>
  );
};

function SwiperItem({ children, loading, ...props }) {
  return (
    <div className={swiperCss.swipeable_item} {...props}>
      {children}
      {loading && <div>Loading</div>}
    </div>
  );
}

export { Swiper, SwiperItem };
