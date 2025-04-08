import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FlipCard = () => {
  const [isNearTop, setIsNearTop] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearTop(true);
        } else {
          setIsNearTop(false);
        }
      },
      {
        rootMargin: "-330px 0px 0px 0px",
        threshold: [0],
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div style={{ perspective: "1000px" }}>
      {" "}
      {/* Perspective container */}
      <motion.div
        ref={contentRef}
        style={{
          height: "300px",
          transform: `rotateX(${isNearTop ? "0deg" : "10deg"})`,
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease",
          background: "grey",
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
          }}
        ></div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
