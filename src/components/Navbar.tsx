import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/configureStore';

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
        {userInfo ? (
          <div className={styles.right}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div>Avatar</div>
              <span>{userInfo.username}</span>
            </div>
            <button>
              <Link
                href="/SignUp"
                className={`${styles.button} ${styles.sign}`}
              >
                로그아웃
              </Link>
            </button>
          </div>
        ) : (
          <div className={styles.right}>
            <button>
              <Link
                href="/LogIn"
                className={`${styles.button} ${styles.login}`}
              >
                로그인
              </Link>
            </button>
            <button>
              <Link
                href="/SignUp"
                className={`${styles.button} ${styles.sign}`}
              >
                회원가입
              </Link>
            </button>
          </div>
        )}
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
