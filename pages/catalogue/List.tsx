import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import CatalogueItem from '@components/catalogue/CatalogueItem';
import Filter from '@components/catalogue/Filter';
import Pagenation from '@components/catalogue/Pagenation';
import { RootState } from 'src/store/configureStore';
import { loadCatalogueList } from 'src/lib/loadCatalogueData';

import styles from '../../src/styles/Catalogue.module.css';

import { ICatalogue, ICatalogueList, IFilters } from 'src/types/types';

export default function CatalogueList({ catalogues }: ICatalogueList) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.logInDone);

  const [filters, setFilters] = useState<IFilters>({
    category: '',
    priceRange: { min: 0, max: Infinity },
    roomTypes: [],
    grades: [],
  });
  const [filteredCatalogues, setFilteredCatalogues] =
    useState<ICatalogue[]>(catalogues);

  // 페이지네이션을 위한 const 설정
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  // 미로그인시 알림 및 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      alert(
        '해당 페이지는 로그인 후 이용할 수 있습니다. 로그인을 진행해주세요.',
      );
      router.push('/LogIn');
    }
  });

  const handleFilterChange = (newFilters: IFilters) => {
    setFilters(newFilters);

    const filtered = catalogues.filter(catalogue => {
      const price = parseInt(catalogue.price.replace(/,/g, ''), 10);
      const matchesCategory = newFilters.category
        ? catalogue.category === newFilters.category
        : true;
      const withinPriceRange =
        price >= newFilters.priceRange.min &&
        price <= newFilters.priceRange.max;
      const matchesRoomType =
        newFilters.roomTypes.length > 0
          ? newFilters.roomTypes.includes(catalogue.room_type)
          : true;
      const matchesGrade =
        newFilters.grades.length > 0
          ? newFilters.grades.includes(catalogue.grade)
          : true;

      return (
        matchesCategory && withinPriceRange && matchesRoomType && matchesGrade
      );
    });

    setFilteredCatalogues(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 따라 카탈로그 슬라이싱
  const currentItems = filteredCatalogues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className={styles.container}>
      <Filter catalogues={catalogues} onFilterChange={handleFilterChange} />
      <div>
        <ul className={styles.list}>
          {currentItems.map(item => (
            <li key={item._id} className={styles.card}>
              <CatalogueItem item={item} />
            </li>
          ))}
        </ul>
        <Pagenation
          catalogues={filteredCatalogues}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
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
