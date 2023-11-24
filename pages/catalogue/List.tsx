import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CatalogueItem from '@components/catalogue/CatalogueItem';
import { RootState } from 'src/store/configureStore';
import { ICatalogue } from 'src/types/types';

import styles from '../../src/styles/Catalogue.module.css';
import { useRouter } from 'next/router';
import loadCatalogueData from 'src/lib/loadCatalogueData';

interface ICatalogueList {
  catalogues: ICatalogue[];
}

export default function CatalogueList({ catalogues }: ICatalogueList) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.logInDone);

  useEffect(() => {
    if (!isLoggedIn) {
      alert(
        '해당 페이지는 로그인 후 접근할 수 있습니다. 로그인을 진행해주세요.',
      );
      router.push('/LogIn');
    }
  });

  return (
    <ul className={styles.container}>
      {catalogues.map(item => (
        <li key={item._id}>
          <CatalogueItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const catalogues = await loadCatalogueData();

  return {
    props: {
      catalogues,
    },
  };
};
