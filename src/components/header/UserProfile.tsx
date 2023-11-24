import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userSignActions } from 'src/store/reducers/userReducer';
import { RootState } from 'src/store/configureStore';

import styles from '../../styles/Navbar.module.css';
import { AiFillSmile } from 'react-icons/ai';

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const handleLogOut = useCallback(() => {
    dispatch(userSignActions.logOutRequest());
  }, [dispatch]);

  return (
    <div className={styles.right}>
      <div className={styles.userInfo}>
        <div>
          <AiFillSmile />
        </div>
        <span>{userInfo.username}</span>
      </div>
      <button
        onClick={handleLogOut}
        className={`${styles.button} ${styles.sign}`}
      >
        로그아웃
      </button>
    </div>
  );
}
