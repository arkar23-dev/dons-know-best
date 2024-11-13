import React, { useState } from "react";

const DraggableCard = ({ children, onSwipeLeft, onSwipeRight }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState("0.3s ease");

    const handleDragStart = (e) => {
        setDragging(true);
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        setStartPosition({ x: clientX, y: clientY });
      };

      const handleDrag = (e) => {
        if (!dragging) return;

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        const deltaX = clientX - startPosition.x;
        const deltaY = clientY - startPosition.y;
        setPosition({ x: deltaX, y: deltaY });
      };

      const handleDragEnd = () => {
        if (!dragging) return;
        setDragging(false);

        // Swipe threshold
        const swipeThreshold = 200;
        const offScreenX = 500; // Distance to move card off-screen

        if (position.x > swipeThreshold) {
          // Swipe right animation
          setTransition("0.5s ease"); // Smoothly animate off-screen
          setPosition({ x: offScreenX, y: position.y });
          setTimeout(() => {
            onSwipeRight && onSwipeRight();
            setPosition({ x: 0, y: 0 });
            setTransition("0.3s ease");
          }, 500);
        } else if (position.x < -swipeThreshold) {
          // Swipe left animation
          setTransition("0.5s ease"); // Smoothly animate off-screen
          setPosition({ x: -offScreenX, y: position.y });
          setTimeout(() => {
            onSwipeLeft && onSwipeLeft();
            // Reset position after swipe
            setPosition({ x: 0, y: 0 });
            setTransition("0.3s ease"); // Reset transition for next card
          }, 500);
        } else {
          // Return to center if not swiped far enough
          setTransition("0.3s ease"); // Smoothly animate back to center
          setPosition({ x: 0, y: 0 });
        }
      };


  return (
    <div
    onMouseDown={handleDragStart}
    onMouseMove={dragging ? handleDrag : null}
    onMouseUp={handleDragEnd}
    onMouseLeave={dragging ? handleDragEnd : null}
    onTouchStart={handleDragStart}
    onTouchMove={handleDrag}
    onTouchEnd={handleDragEnd}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${
          position.x / 30
        }deg)`,
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
