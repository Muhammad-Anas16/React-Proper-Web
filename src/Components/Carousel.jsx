import { useState, useEffect } from "react";

const images = [
  {
    name: "image1",
    src: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-240909-lp.jpg.landing-big_2x.jpg",
  },
  {
    name: "image2",
    src: "https://cdn.mos.cms.futurecdn.net/eb6jW2oVkZEvS4Ms3MRdGZ.jpg",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
      <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] rounded-xl overflow-hidden shadow-lg">
        {/* Slides */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1L1 5l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
