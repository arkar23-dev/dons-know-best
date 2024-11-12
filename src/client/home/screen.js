import React, { useState, useRef,useEffect } from "react";
import SwiperCss from "../css/swiper.css";
import cardCss from "../css/card.css"

const data = [
    { id: 1, title: "Content 1", description: "This is the description for Content 1" },
    { id: 2, title: "Content 2", description: "This is the description for Content 2" },
    { id: 3, title: "Content 3", description: "This is the description for Content 3" },
    { id: 4, title: "Content 4", description: "This is the description for Content 4" },
  ];

const Screen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const scrollTimeout = useRef(null);


  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const swipeThreshold = 50; // Threshold to trigger swipe

    if (swipeDistance > swipeThreshold && currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (swipeDistance < -swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  // Wheel event handler
  const handleWheel = (e) => {
    // Clear any existing timeout
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    // Set a small delay to prevent multiple triggers on continuous scroll
    scrollTimeout.current = setTimeout(() => {
      if (e.deltaY > 20 && currentIndex < data.length - 1) {
        // Scrolling down
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (e.deltaY < -20 && currentIndex > 0) {
        // Scrolling up
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
      className={SwiperCss.swipeable_container}
    >
      <div
        className={SwiperCss.swipeable_content}
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {data.map((content) => (
          <div className={SwiperCss.swipeable_item} key={content.id}>
           <div className={cardCss.card}>
              <div className={cardCss.card_header}>
                {content.title}
              </div>
              <div className={cardCss.card_body}>
                <p className={cardCss.card_text}>{content.description}</p>
              </div>
              <div className={cardCss.card_footer}>
               footer
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen;
