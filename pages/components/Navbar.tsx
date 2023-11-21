import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.css';

import { AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
          <button onClick={() => setIsMenuVisible(!isMenuVisible)}>
            <AiOutlineMenu />
          </button>
          <Link href="/">
            {/* TODO: 로고 이미지 추가 필요 */}
            <Image
              src="/favicon.ico"
              alt="Vercel Logo"
              width={24}
              height={24}
            />
          </Link>
        </div>
        <Link href="/LogIn" className={styles.sign}>
          로그인 / 회원가입
        </Link>
      </nav>

      {/* 사이드메뉴 */}
      {isMenuVisible && (
        <div className={styles.sideMenu}>
          <span>Menu</span>
        </div>
      )}
    </>
  );
}

export default Navbar;
