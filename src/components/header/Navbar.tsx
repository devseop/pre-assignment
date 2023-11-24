import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import SignButtons from './SignButtons';
import { RootState } from 'src/store/configureStore';

import styles from '../../styles/Navbar.module.css';
import { AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <>
      <header className={styles.container}>
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
        {userInfo ? <UserProfile /> : <SignButtons />}
      </header>

      {/* 사이드메뉴 */}
      {isMenuVisible && (
        <nav className={styles.sideMenu}>
          <span>Menu</span>
        </nav>
      )}
    </>
  );
}

export default Navbar;
