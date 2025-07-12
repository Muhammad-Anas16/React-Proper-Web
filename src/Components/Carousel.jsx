import React, { useEffect, useState, useRef } from "react";
import { getCarouselImages } from "../Firebase/firebaseFunctions";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const defaultImages = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
];

const Carousel = () => {
  const [images, setImages] = useState(defaultImages);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    getCarouselImages().then((imgs) => {
      if (imgs && imgs.length > 0) setImages(imgs);
    });
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
    // eslint-disable-next-line
  }, [images, current]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3500);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setFade(false);
    }, 200);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setFade(false);
    }, 200);
  };

  if (!images.length) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "32px auto",
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
        background: "#fff",
        minHeight: 220,
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "38%",
          position: "relative",
        }}
      >
        <img
          src={images[current]}
          alt={`carousel-${current}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 18,
            opacity: fade ? 0 : 1,
            transition: "opacity 0.4s cubic-bezier(.4,0,.2,1)",
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
          }}
        />
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            zIndex: 2,
          }}
          aria-label="Previous"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            zIndex: 2,
          }}
          aria-label="Next"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      </div>
      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: idx === current ? "#DB4444" : "#fff",
              margin: "0 6px",
              border: "2px solid #DB4444",
              transition: "background 0.3s",
              cursor: "pointer",
              boxShadow: idx === current ? "0 0 6px #DB4444" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
