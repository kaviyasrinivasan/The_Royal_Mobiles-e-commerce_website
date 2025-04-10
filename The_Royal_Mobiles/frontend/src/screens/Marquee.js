import React, { useState, useEffect } from "react";
import "./Marquee.css"; 
import p1 from "./marquee_pics/p1.webp";
import p2 from "./marquee_pics/p2.webp";
import p3 from "./marquee_pics/p3.webp";
import p4 from "./marquee_pics/p4.webp";
import p5 from "./marquee_pics/p5.webp";
import p6 from "./marquee_pics/p6.webp";
import p7 from "./marquee_pics/p7.webp";

const images = [p1, p2, p3, p4, p5, p6, p7];

const Marquee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return React.createElement(
    "div",
    { className: "marquee-container" },
    React.createElement(
      "div",
      { className: "marquee" },
      React.createElement("img", {
        key: currentIndex,
        src: images[currentIndex],
        alt: `marquee-img-${currentIndex}`,
        className: "marquee-img fade-in",
      })
    ),
    React.createElement(
      "div",
      { className: "bubbles" },
      images.map((_, index) =>
        React.createElement("span", {
          key: index,
          className: `bubble ${index === currentIndex ? "active" : ""}`,
        })
      )
    )
  );
};

export default Marquee;
