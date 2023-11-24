import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import CatalogueItem from '@components/catalogue/CatalogueItem';
import { RootState } from 'src/store/configureStore';
import { loadCatalogueList } from 'src/lib/loadCatalogueData';

import styles from '../../src/styles/Catalogue.module.css';

import { ICatalogueList } from 'src/types/types';
import Pagenation from '@components/Pagenation';

export default function CatalogueList({ catalogues }: ICatalogueList) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.logInDone);

  // 페이지네이션을 위한 const
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerpage = 20;
  const indexOfLastItem = currentPage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;
  const currentItems = catalogues.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!isLoggedIn) {
      alert(
        '해당 페이지는 로그인 후 이용할 수 있습니다. 로그인을 진행해주세요.',
      );
      router.push('/LogIn');
    }
  });

  return (
    <>
      <ul className={`${styles.container} ${styles.list}`}>
        {currentItems.map(item => (
          <li key={item._id} className={styles.card}>
            <CatalogueItem item={item} />
          </li>
        ))}
      </ul>
      <Pagenation
        catalogues={catalogues}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: { catalogues: ICatalogueList };
}> {
  const catalogues = await loadCatalogueList();

  return {
    props: {
      catalogues,
    },
  };
}
