import React, { useState, useRef, useCallback } from "react";

const DraggableCard = ({ children, onSwipeLeft, onSwipeRight, swipeThreshold = 90, showBtns = false }) => {
  const [{ x, transition }, setDragState] = useState({
    x: 0,
    transition: "none",
  });
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const swiped = useRef(false); // Prevent multiple swipes in a single interaction

  const handleDragStart = useCallback((e) => {
    if (swiped.current) return; // Prevent drag if already swiped

    dragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;
    startY.current = e.clientY || e.touches[0].clientY;
    setDragState((prevState) => ({ ...prevState, transition: "none" }));
  }, []);

  const handleDrag = useCallback((e) => {
    if (!dragging.current || swiped.current) return;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    // Only update horizontal position if the horizontal movement is greater than vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragState((prevState) => ({ ...prevState, x: deltaX }));
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragging.current || swiped.current) return;
    dragging.current = false;

    if (x > swipeThreshold) {
      swiped.current = true; // Lock further swipes
      setDragState({ x: 500, transition: "0.25s ease" });
      setTimeout(() => {
        onSwipeRight && onSwipeRight();
        resetPosition();
      }, 250);
    } else if (x < -swipeThreshold) {
      swiped.current = true; // Lock further swipes
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
    swiped.current = false; // Unlock swiping after reset
    setDragState({ x: 0, transition: "0.2s ease-out" });
  }, []);

  const triggerSwipeLeft = () => {
    if (swiped.current) return; // Prevent swipe if already swiped
    swiped.current = true;
    setDragState({ x: -500, transition: "0.25s ease" });
    setTimeout(() => {
      onSwipeLeft && onSwipeLeft();
      resetPosition();
    }, 250);
  };

  const triggerSwipeRight = () => {
    if (swiped.current) return; // Prevent swipe if already swiped
    swiped.current = true;
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
          transform: `translateX(${x}px) rotate(${x / 20}deg)`, // Rotate based on horizontal position
          transition,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        {children}
      </div>

      {showBtns && (
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={triggerSwipeLeft} style={buttonStyle}>
            Swipe Left
          </button>
          <button onClick={triggerSwipeRight} style={buttonStyle}>
            Swipe Right
          </button>
        </div>
      )}
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
