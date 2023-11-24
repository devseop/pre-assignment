import React from 'react';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from 'src/store/configureStore';

import styles from '../../styles/Catalogue.module.css';
import { IoMdArrowForward } from 'react-icons/io';

export default function CatalogueLinkBanner() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Link href={userInfo ? '/catalogue/List' : '/LogIn'}>
      <div className={styles.banner}>
        <p>다양한 카탈로그들을 만나보세요!</p>
        <div>
          <IoMdArrowForward />
        </div>
      </div>
    </Link>
  );
}
