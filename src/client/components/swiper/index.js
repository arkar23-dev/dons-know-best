import React, { useState, useRef, useEffect, useCallback } from "react";
import swiperCss from "./swiper.css";

const SWIPE_THRESHOLD = 50; // Threshold for swipe action to trigger

const Swiper = ({ children, loadMore, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchEndY = useRef(0);
  const touchEndX = useRef(0);
  const timeoutRef = useRef(null);

  const dataLength = React.Children.count(children);

  const handleTouchStart = (e) => {
    // Initialize touch start positions
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    // Update touch positions as the user moves their finger
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = useCallback(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const swipeDistanceY = touchStartY.current - touchEndY.current;
      const swipeDistanceX = touchStartX.current - touchEndX.current;

      // Check if it's a drag (more movement on the X axis than Y axis)
      if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
        return; // Ignore swipe if it's more of a drag
      }

      if (swipeDistanceY > SWIPE_THRESHOLD && currentIndex < dataLength - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Swipe down to next item
      } else if (swipeDistanceY < -SWIPE_THRESHOLD && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1); // Swipe up to previous item
      }

      if (swipeDistanceY > SWIPE_THRESHOLD && currentIndex + 1 === dataLength) {
        loadMore(); // Trigger load more if at the last item
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
