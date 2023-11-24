import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/configureStore';
import {
  loadCatalogueById,
  loadCatalogueList,
} from 'src/lib/loadCatalogueData';

import styles from '../../src/styles/Catalogue.module.css';
import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

import { ICatalogue } from 'src/types/types';
import Carousel from '@components/carousel/Carousel';
import Modal from '@components/Modal';

interface ICatalogueDetail {
  catalogueItem: ICatalogue;
}

export default function CatalogueDetail({ catalogueItem }: any) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.logInDone);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn) {
      alert(
        '해당 페이지는 로그인 후 이용할 수 있습니다. 로그인을 진행해주세요.',
      );
      router.push('/LogIn');
    }
  });

  const handleViewAllClick = () => {
    setShowCarousel(true);
  };

  const handleCloseModal = () => {
    setShowCarousel(false);
  };

  return (
    <div className={`${styles.container} ${styles.detail}`}>
      <div className={styles.imageWrapper}>
        <picture className={styles.representativeImage}>
          <Image
            className={styles.representativeImage}
            src={catalogueItem.representative_image}
            width={200}
            height={200}
            quality={50}
            priority={true}
            alt={catalogueItem.product_name}
          />
        </picture>
        <ul className={styles.subImages}>
          {catalogueItem.images
            .slice(0, 2)
            .map((image: string, index: number) => (
              <li key={index}>
                <Image
                  src={image}
                  width={100}
                  height={100}
                  quality={50}
                  priority={true}
                  alt="상세 이미지"
                />
              </li>
            ))}
        </ul>
        {/* 사진 모두 보기 버튼 */}
        <button className={styles.slideViewButton} onClick={handleViewAllClick}>
          View All
        </button>
        <Modal isOpen={showCarousel} onClose={handleCloseModal}>
          <Carousel data={catalogueItem.images} />
        </Modal>
      </div>
      <div className={styles.hotelInfoWrapper}>
        <div className={styles.hotelTitle}>
          <span>{catalogueItem.product_name}</span>
          <h1>{catalogueItem.hotel}</h1>
        </div>
        <div className={styles.gradeAndType}>
          <h3>{catalogueItem.grade} STAR</h3>
          <h4>{catalogueItem.room_type.toUpperCase()} ROOM</h4>
        </div>
        <p className={styles.hotelDesc}>{catalogueItem.description}</p>
        <ul className={styles.etcWrapper}>
          <li className={styles.etc}>
            <div>
              <FaLocationDot />
            </div>
            <p>{catalogueItem.address}</p>
            duu
          </li>
          <li className={styles.etc}>
            <div>
              <FaPhone />
            </div>
            <p>{catalogueItem.phone}</p>
          </li>
          <li className={styles.etc}>
            <div>
              <MdEmail />
            </div>
            <p>{catalogueItem.email}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const catalogues = await loadCatalogueList();

  const paths = catalogues.map((item: ICatalogue) => ({
    params: { id: item._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: any) {
  const catalogueItem = await loadCatalogueById(params);

  if (!catalogueItem) {
    return {
      notFound: true, // 404 페이지 반환
    };
  }

  return {
    props: {
      catalogueItem,
    },
  };
}
