import React, { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Farenin ekrandaki anlık konumunu alıyoruz
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Farenin tıklanabilir bir şeyin üzerine gelip gelmediğini kontrol ediyoruz
    const handleMouseOver = (e) => {
      const target = e.target;
      // Eğer fare bir butona, linke (a) veya bizim '.clickable' kartlarımıza gelirse hover efektini yak
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest(".clickable") ||
        target.closest(".hero-btn")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* İki katmanlı imleç: Biri farenin tam ucu, diğeri onu takip eden halka */}
      <div
        className={`cursor-dot ${isHovering ? "hover" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
      <div
        className={`cursor-outline ${isHovering ? "hover" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
    </>
  );
};

export default CustomCursor;
