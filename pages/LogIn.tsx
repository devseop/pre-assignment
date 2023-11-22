import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import useInput from 'src/hooks/useInput';
import * as checkInputVaild from 'src/utils/checkValidations';

import styles from '../src/styles/Sign.module.css';

function LogIn() {
  const router = useRouter();
  const { values, handleChange } = useInput({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: 로그인 버튼 클릭시 가상의 API를 호출하는 코드 작성 필요
    router.push('/');
  };

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
