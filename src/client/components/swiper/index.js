import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import swiperCss from "./swiper.css";

const SWIPE_THRESHOLD = 50; // Threshold for swipe action to trigger

const Swiper = forwardRef(({ children, loadMore, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchEndY = useRef(0);
  const touchEndX = useRef(0);
  const timeoutRef = useRef(null);

  const dataLength = React.Children.count(children);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = useCallback(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const swipeDistanceY = touchStartY.current - touchEndY.current;
      const swipeDistanceX = touchStartX.current - touchEndX.current;

      if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
        return;
      }

      if (swipeDistanceY > SWIPE_THRESHOLD && currentIndex < dataLength - 1) {
        nextSlide();
      } else if (swipeDistanceY < -SWIPE_THRESHOLD && currentIndex > 0) {
        prevSlide();
      }

      if (swipeDistanceY > SWIPE_THRESHOLD && currentIndex + 1 === dataLength) {
        loadMore();
      }
    }, 80);
  }, [currentIndex, dataLength, loadMore]);

  const nextSlide = useCallback(() => {
    if (currentIndex < dataLength - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex, dataLength]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  useImperativeHandle(ref, () => ({
    nextSlide,
    prevSlide,
    goToSlide: (index) => {
      if (index >= 0 && index < dataLength) {
        setCurrentIndex(index);
      }
    },
  }));

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
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
});

function SwiperItem({ children, loading, ...props }) {
  return (
    <div className={swiperCss.swipeable_item} {...props}>
      {children}
      {loading && <div>Loading</div>}
    </div>
  );
}

export { Swiper, SwiperItem };
