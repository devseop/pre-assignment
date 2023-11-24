import React, { useEffect, useRef, useState } from 'react';
import CarouselItem from './CarouselItem';

import styles from '../../styles/Carousel.module.css';
import {
  BiSolidCaretLeftCircle,
  BiSolidCaretRightCircle,
} from 'react-icons/bi';

interface ICarousel {
  data: string[];
}

export default function Carousel({ data }: ICarousel) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);
  const slideLength = data.length;

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slideLength);
    }, 3000); //3초마다 슬라이드

    return () => clearInterval(interval);
  }, [slideLength]);

  // currentIndex가 바뀔 때마다 슬라이드 이동
  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${currentIndex}00%)`;
    }
  }, [currentIndex]);

  const handleSlideMoveLeft = () => {
    setCurrentIndex((currentIndex - 1 + slideLength) % slideLength);
  };

  const handleSlideMoveRight = () => {
    setCurrentIndex((currentIndex + 1) % slideLength);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <button
          type="button"
          className={`${styles.leftButton} ${
            currentIndex === 0 ? `${styles.ButtonHidden}` : ''
          }`}
          onClick={handleSlideMoveLeft}
        >
          <BiSolidCaretLeftCircle />
        </button>
        <button
          type="button"
          className={`${styles.rightButton} ${
            currentIndex + 1 === slideLength ? `${styles.ButtonHidden}` : ''
          }`}
          onClick={handleSlideMoveRight}
        >
          <BiSolidCaretRightCircle />
        </button>
        <ul ref={carouselRef} className={styles.carousel}>
          {data.map((item, index) => (
            <li key={index} className={styles.carouselItem}>
              <CarouselItem data={item} />
            </li>
          ))}
        </ul>
        <p className={styles.slideIndex}>
          {currentIndex + 1} / {slideLength}
        </p>
      </div>
    </div>
  );
}
