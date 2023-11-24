import React, { useState } from 'react';
import { ICatalogue } from 'src/types/types';
import styles from '../styles/Components.module.css';

interface PaginationProps {
  catalogues: ICatalogue[];
  onPageChange: (page: number) => void;
}

export default function Pagenation({
  catalogues,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  const pages = Math.ceil(catalogues.length / itemsPerPage);
  const maxPageNumbersToShow = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  // 시작 페이지 계산
  const halfMaxVisible = Math.floor(maxPageNumbersToShow / 2);
  let startPage = Math.max(currentPage - halfMaxVisible, 1);
  let endPage = startPage + maxPageNumbersToShow - 1;

  // 마지막 페이지가 총 페이지 수를 초과하지 않도록 조정
  if (endPage > pages) {
    endPage = pages;
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  return (
    <div className={styles.pagenationContainer}>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      ).map(page => (
        <button
          className={`${styles.pageButton} ${
            currentPage === page ? styles.selected : ''
          }`}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
