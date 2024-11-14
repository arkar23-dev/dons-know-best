
import React, { useState, useRef, useEffect, useCallback } from "react";
import swiperCss from "./swiper.css";

const SWIPE_THRESHOLD = 50;

const Swiper = ({ children, loadMore, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  const dataLength = React.Children.count(children);

  const handleTouchStart = (e) => {
    const { clientX, clientY } = e.touches[0];
    touchStart.current = { x: clientX, y: clientY };
  };

  const handleTouchMove = (e) => {
    const { clientX, clientY } = e.touches[0];
    touchEnd.current = { x: clientX, y: clientY };
  };

  const handleTouchEnd = useCallback(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const swipeDistanceY = touchStart.current.y - touchEnd.current.y;
      const swipeDistanceX = touchStart.current.x - touchEnd.current.x;

      // Ignore swipe if it's primarily horizontal
      if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) return;

      // Check swipe direction and set index accordingly
      if (swipeDistanceY > SWIPE_THRESHOLD) {
        if (currentIndex + 1 === dataLength) loadMore();
        if (currentIndex < dataLength - 1) setCurrentIndex((i) => i + 1);
      } else if (swipeDistanceY < -SWIPE_THRESHOLD && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    }, 100);
  }, [currentIndex, dataLength, loadMore]);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
      clearTimeout(timeoutRef.current);
    };
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
          transform: `translate3d(0, -${currentIndex * 100}vh, 0)`,
          transition: "transform 0.6s cubic-bezier(0.25, 0.8, 0.5, 1)",
          willChange: "transform",  // Optimize for smoother transition
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
