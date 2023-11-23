import Image from 'next/image';
import React from 'react';

interface ICarouselItem {
  data: string;
}

export default function CarouselItem({ data }: ICarouselItem) {
  return (
    <Image
      src={data}
      alt="이미지"
      width={500}
      height={500}
      quality={50}
      priority={true}
    />
  );
}
