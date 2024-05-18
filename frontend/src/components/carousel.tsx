"use client";
import React, { useState, useEffect } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (n: any) => {
    const slides = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add("hidden");
    }
    slides[n].classList.remove("hidden");
  };

  const changeSlide = (n: any) => {
    const slides = document.getElementsByClassName("carousel-item");
    const totalSlides = slides.length;
    setCurrentSlide((prevSlide) => (prevSlide + n + totalSlides) % totalSlides);
    showSlide(currentSlide);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="flex flex-col space-y-4 p-4 min-h-80 justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" w-full overflow-hidden ">
        <div id="item1" className="carousel-item w-full">
          <img src="/HR.png" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full hidden">
          <img src="/account.png" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full hidden">
          <img src="/inventory.png" className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full hidden">
          <img src="/sales.png" className="w-full" />
        </div>
        <div className="flex justify-center">
        <button className="prev " onClick={() => changeSlide(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button className="next" onClick={() => changeSlide(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        </div>
        
      </div>
    </div>
  );
}
