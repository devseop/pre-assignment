import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Input from '../src/components/Input';
import useInput from 'src/hooks/useInput';
import * as checkInputVaild from 'src/utils/checkValidations';
import { userSignActions } from 'src/store/reducers/user';
import { RootState } from 'src/store/configureStore';

import styles from '../src/styles/Sign.module.css';

function LogIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { values, handleChange } = useInput({
    email: '',
    password: '',
  });

  const { logInDone, userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (logInDone) {
      alert(`환영합니다. ${userInfo.username}님!`);
      router.push('/');
    }
  }, [logInDone, router, userInfo?.username]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, password } = values;
      dispatch(userSignActions.logInRequest({ email, password }));
    },
    [values, dispatch],
  );

  const { checkValidation, validateEmail, validatePassword } = checkInputVaild;

  return (
    <section className={styles.container}>
      <h1 className={styles.header}>로그인</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          header="이메일 *"
          type="text"
          placeholder="example@email.com"
          name="email"
          value={values.email}
          onChange={handleChange}
          isValid={() => validateEmail(values.email)}
        />
        <Input
          header="비밀번호 *"
          type="password"
          placeholder="로그인시 사용할 비밀번호를 입력해주세요."
          name="password"
          value={values.password}
          onChange={handleChange}
          isValid={() => validatePassword(values.password)}
        />
        <button
          className={`${styles.button} ${
            checkValidation(values) ? `${styles.isValid}` : ''
          }`}
        >
          로그인
        </button>
        <div className={styles.more}>
          <span>계정이 없으시다면</span>
          <button>
            <Link href="/SignUp">회원가입하기</Link>
          </button>
        </div>
      </form>
    </section>
  );
}

export default LogIn;
