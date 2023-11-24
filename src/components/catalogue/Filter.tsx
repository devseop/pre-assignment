import React, { useState } from 'react';
import getFilterValues from 'src/lib/getFilterValues';

import styles from '../../styles/Filter.module.css';

import { ICatalogue, IFilters } from 'src/types/types';

interface FilterProps {
  catalogues: ICatalogue[];
  onFilterChange: (filters: IFilters) => void;
}

export default function Filter({ catalogues, onFilterChange }: FilterProps) {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: Infinity,
  });
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);

  // 카테고리, 룸 타입, 등급의 값 배열 가져오기
  const categoryOptions = getFilterValues(catalogues, 'category');
  const roomTypeOptions = getFilterValues(catalogues, 'room_type');
  const gradeOptions = getFilterValues(catalogues, 'grade')
    .sort((a, b) => a - b)
    .map(String);

  // 가격 필터 변경 핸들러
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max',
  ) => {
    setPriceRange({
      ...priceRange,
      [type]: e.target.value ? Number(e.target.value) : 0,
    });
  };

  // 카테고리 필터 변경 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  // 룸 타입 필터 변경 핸들러
  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRoomTypes = e.target.checked
      ? [...roomTypes, e.target.value]
      : roomTypes.filter(type => type !== e.target.value);
    setRoomTypes(updatedRoomTypes);
  };

  // 등급 필터 변경 핸들러
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const updatedGrades = e.target.checked
      ? [...grades, e.target.value]
      : grades.filter(grade => grade !== e.target.value);
    setGrades(updatedGrades);
  };

  // 필터 적용 버튼 클릭 핸들러
  const applyFilters = () => {
    onFilterChange({ category, priceRange, roomTypes, grades });
  };

  // 필터 초기화
  const resetFilters = () => {
    setCategory('');
    setPriceRange({ min: 0, max: Infinity });
    setRoomTypes([]);
    setGrades([]);
    onFilterChange({
      category: '',
      priceRange: { min: 0, max: Infinity },
      roomTypes: [],
      grades: [],
    });
  };

  return (
    <aside className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <h1 className={styles.header}>Filter</h1>
        {/* 가격 필터 */}
        <div className={styles.filter}>
          <label className={styles.title}>Price</label>
          <div className={styles.priceWrapper}>
            <input
              type="number"
              className={styles.price}
              placeholder="Minimum"
              value={priceRange.min}
              onChange={e => handlePriceChange(e, 'min')}
            />
            <input
              type="number"
              className={styles.price}
              placeholder="Maximum"
              value={priceRange.max}
              onChange={e => handlePriceChange(e, 'max')}
            />
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className={styles.filter}>
          <label className={styles.title}>Category</label>
          <div className={styles.values}>
            {categoryOptions.map(cat => (
              <label className="flex items-center" key={cat}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={handleCategoryChange}
                />
                <span className="ml-2">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 룸 타입 필터 */}
        <div className={styles.filter}>
          <label className={styles.title}>Room Type</label>
          <div className={styles.values}>
            {roomTypeOptions.map(type => (
              <label className="flex items-center" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={roomTypes.includes(type)}
                  onChange={handleRoomTypeChange}
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 등급 필터 */}
        <div className={styles.filter}>
          <label className={styles.title}>Grade</label>
          <div className={styles.values}>
            {gradeOptions.map(grade => (
              <label className="flex items-center" key={grade}>
                <input
                  type="checkbox"
                  value={grade}
                  checked={grades.includes(grade)}
                  onChange={handleGradeChange}
                />
                <span className="ml-2">{grade}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.primary} ${styles.button}`}
            onClick={applyFilters}
          >
            Search
          </button>
          <button
            className={`${styles.secondary} ${styles.button}`}
            onClick={resetFilters}
          >
            Clear
          </button>
        </div>
      </div>
    </aside>
  );
}
