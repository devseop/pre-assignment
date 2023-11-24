import React from 'react';
import Link from 'next/link';

import styles from '../../styles/Navbar.module.css';

export default function SignButtons() {
  return (
    <div className={styles.right}>
      <button>
        <Link href="/LogIn" className={`${styles.button} ${styles.login}`}>
          로그인
        </Link>
      </button>
      <button>
        <Link href="/SignUp" className={`${styles.button} ${styles.sign}`}>
          회원가입
        </Link>
      </button>
    </div>
  );
}
