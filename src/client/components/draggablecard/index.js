import React, { useState, useRef, useCallback } from "react";

const DraggableCard = ({ children, onSwipeLeft, onSwipeRight, swipeThreshold }) => {
  const [{ x, y, transition }, setDragState] = useState({
    x: 0,
    y: 0,
    transition: "none",
  });
  const dragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });


  const xThreshold = 14;
  const swipeThresholdLimit = swipeThreshold ??  90;
  const offScreenX = 300;

  const handleDragStart = useCallback((e) => {
    dragging.current = true;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    startPosition.current = { x: clientX, y: clientY };
    setDragState((prevState) => ({ ...prevState, transition: "none" }));
  }, []);

  const handleDrag = useCallback((e) => {
    if (!dragging.current) return;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    const deltaX = clientX - startPosition.current.x;
    const deltaY = clientY - startPosition.current.y;

    // Only update position if x-axis movement exceeds threshold
    if (Math.abs(deltaX) > xThreshold) {
      setDragState((prevState) => ({
        ...prevState,
        x: deltaX,
        y: deltaY,
      }));
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;

    if (x > swipeThresholdLimit) {
      setDragState({ x: offScreenX, y, transition: "0.25s ease" });
      setTimeout(() => {
        onSwipeRight && onSwipeRight();
        resetPosition();
      }, 250);
    } else if (x < -swipeThresholdLimit) {
      setDragState({ x: -offScreenX, y, transition: "0.25s ease" });
      setTimeout(() => {
        onSwipeLeft && onSwipeLeft();
        resetPosition();
      }, 250);
    } else {
      resetPosition();
    }
  }, [x, y, onSwipeLeft, onSwipeRight]);

  const resetPosition = useCallback(() => {
    setDragState({ x: 0, y: 0, transition: "0.2s ease-out" });
  }, []);

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={dragging.current ? handleDrag : null}
      onMouseUp={handleDragEnd}
      onMouseLeave={dragging.current ? handleDragEnd : null}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${x / 20}deg)`,
        transition: transition,
        backgroundColor: "lightcoral",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
