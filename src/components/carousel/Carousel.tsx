import React, { useEffect, useRef, useState } from 'react';
import CarouselItem from './CarouselItem';
import { INDEX_BANNER_IMAGES } from 'src/constant/constant';

import styles from '../../styles/Carousel.module.css';
import {
  BiSolidCaretLeftCircle,
  BiSolidCaretRightCircle,
} from 'react-icons/bi';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);
  const slideLength = INDEX_BANNER_IMAGES.length;

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
          {INDEX_BANNER_IMAGES.map(obj => (
            <li key={obj.id} className={styles.carouselItem}>
              <CarouselItem data={obj.img} />
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
