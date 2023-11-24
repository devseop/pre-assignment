import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import { RootState } from 'src/store/configureStore';

import styles from '../../styles/Catalogue.module.css';
import { ICatalogue } from 'src/types/types';

interface ICatalogueItem {
  item: ICatalogue;
}

export default function CatalogueItem({ item }: ICatalogueItem) {
  const isLoggedIn = useSelector((state: RootState) => state.user.logInDone);

  return (
    <Link href={`catalogue/${item._id}`} passHref>
      <Image
        className={styles.thumbnail}
        src={item.representative_image}
        width={100}
        height={100}
        quality={50}
        priority={true}
        alt={item.product_name}
      />
      <div className={styles.infoContainer}>
        <span>{item.hotel}</span>
        <h3>{item.product_name}</h3>
        <div className={styles.infoDetail}>
          <h4>
            {item.grade} STAR ・ {item.room_type.toUpperCase()}
          </h4>
          <h5>{isLoggedIn ? `${item.price} ${item.currency}` : ''}</h5>
        </div>
      </div>
    </Link>
  );
}
