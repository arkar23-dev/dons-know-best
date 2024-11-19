import React, { useState, useRef, useCallback } from "react";

const DraggableCard = ({ children, onSwipeLeft, onSwipeRight, swipeThreshold = 90 }) => {
  const [{ x, transition }, setDragState] = useState({
    x: 0,
    transition: "none",
  });
  const dragging = useRef(false);
  const startX = useRef(0);

  const handleDragStart = useCallback((e) => {
    dragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;
    setDragState((prevState) => ({ ...prevState, transition: "none" }));
  }, []);

  const handleDrag = useCallback((e) => {
    if (!dragging.current) return;

    const clientX = e.clientX || e.touches[0].clientX;
    const deltaX = clientX - startX.current;
    setDragState((prevState) => ({ ...prevState, x: deltaX }));
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;

    if (x > swipeThreshold) {
      setDragState({ x: 500, transition: "0.25s ease" });
      setTimeout(() => {
        onSwipeRight && onSwipeRight();
        resetPosition();
      }, 250);
    } else if (x < -swipeThreshold) {
      setDragState({ x: -500, transition: "0.25s ease" });
      setTimeout(() => {
        onSwipeLeft && onSwipeLeft();
        resetPosition();
      }, 250);
    } else {
      resetPosition();
    }
  }, [x, swipeThreshold, onSwipeLeft, onSwipeRight]);

  const resetPosition = useCallback(() => {
    setDragState({ x: 0, transition: "0.2s ease-out" });
  }, []);

  const triggerSwipeLeft = () => {
    setDragState({ x: -500, transition: "0.25s ease" });
    setTimeout(() => {
      onSwipeLeft && onSwipeLeft();
      resetPosition();
    }, 250);
  };

  const triggerSwipeRight = () => {
    setDragState({ x: 500, transition: "0.25s ease" });
    setTimeout(() => {
      onSwipeRight && onSwipeRight();
      resetPosition();
    }, 250);
  };

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        onMouseDown={handleDragStart}
        onMouseMove={dragging.current ? handleDrag : null}
        onMouseUp={handleDragEnd}
        onMouseLeave={dragging.current ? handleDragEnd : null}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        style={{
          transform: `translateX(${x}px) rotate(${x / 20}deg)`,
          transition,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        {children}
      </div>
      {/*TO DO Buttons to be part of the card screen*/}
     <div style={{ display: "flex", gap: "10px" , marginTop: '10px'}}>
       <button onClick={triggerSwipeLeft} style={buttonStyle}>
         Swipe Left
       </button>
       <button onClick={triggerSwipeRight} style={buttonStyle}>
         Swipe Right
       </button>
     </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "dodgerblue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default DraggableCard;
