import React from 'react';
import Link from 'next/link';
import Input from '../components/Input';
import useInput from 'src/hooks/useInput';

import styles from '../styles/Sign.module.css';
import checkValidation from 'src/utils/checkValidation';
import { useRouter } from 'next/router';

function SignUp() {
  const router = useRouter();
  const { values, handleChange } = useInput({
    email: '',
    password: '',
    checkPassword: '',
    username: '',
    phone: '',
    businessNumber: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: 회원가입 버튼 클릭시 가상의 API를 호출하는 코드 작성 필요
    alert('회원가입이 완료되었습니다. 로그인을 진행해주세요.');
    router.push('/SignIn');
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.header}>회원가입</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          header="이메일 *"
          type="text"
          placeholder="example@email.com"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Input
          header="비밀번호 *"
          type="password"
          placeholder="로그인시 사용할 비밀번호를 입력해주세요."
          notice="영문 대/소문자와 숫자, 특수문자를 포함한 최소 8자 ~ 16자 이하로
          입력해주세요."
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Input
          header="비밀번호 확인 *"
          type="password"
          placeholder="로그인시 사용할 비밀번호를 한번 더 입력해주세요."
          name="checkPassword"
          value={values.checkPassword}
          onChange={handleChange}
        />
        <Input
          header="이름 *"
          type="text"
          placeholder="이름을 입력해주세요."
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <Input
          header="전화번호 *"
          type="text"
          placeholder="'-'를 제외한 전화번호를 입력해주세요."
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
        <Input
          header="사업자번호 *"
          type="text"
          placeholder="'-'를 제외한 사업자번호를 입력해주세요."
          name="businessNumber"
          value={values.businessNumber}
          onChange={handleChange}
        />
        <button
          className={`${styles.button} ${
            checkValidation(values) ? `${styles.isValid}` : ''
          }`}
        >
          회원가입
        </button>
        <div className={styles.more}>
          <span>이미 가입하셨다면</span>
          <button>
            <Link href="/LogIn">로그인하기</Link>
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
