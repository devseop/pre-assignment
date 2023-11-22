import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import useInput from 'src/hooks/useInput';
import * as checkInputVaild from 'src/utils/checkValidations';

import styles from '../src/styles/Sign.module.css';

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

  const {
    checkValidation,
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validateUsername,
    validatePhoneNumber,
    validateBusinessNumber,
  } = checkInputVaild;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          username: values.username,
          phone: values.phone,
          businessNumber: values.businessNumber,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push('/LogIn');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생: ', error);
      alert('회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
          isValid={() => validateEmail(values.email)}
        />
        <Input
          header="비밀번호 *"
          type="password"
          placeholder="로그인시 사용할 비밀번호를 입력해주세요."
          notice="영문 대/소문자와 숫자, 특수문자를 포함하여 최소 8자~16자 이하로
          입력해주세요."
          name="password"
          value={values.password}
          onChange={handleChange}
          isValid={() => validatePassword(values.password)}
        />
        <Input
          header="비밀번호 확인 *"
          type="password"
          placeholder="로그인시 사용할 비밀번호를 한번 더 입력해주세요."
          name="checkPassword"
          value={values.checkPassword}
          onChange={handleChange}
          isValid={() =>
            validatePasswordConfirmation(values.password, values.checkPassword)
          }
        />
        <Input
          header="이름 *"
          type="text"
          placeholder="이름을 입력해주세요."
          name="username"
          value={values.username}
          onChange={handleChange}
          isValid={() => validateUsername(values.username)}
        />
        <Input
          header="전화번호 *"
          type="text"
          placeholder="'-'를 제외한 전화번호를 입력해주세요."
          name="phone"
          value={values.phone}
          onChange={handleChange}
          isValid={() => validatePhoneNumber(values.phone)}
        />
        <Input
          header="사업자번호 *"
          type="text"
          placeholder="'-'를 제외한 사업자번호를 입력해주세요."
          name="businessNumber"
          value={values.businessNumber}
          onChange={handleChange}
          isValid={() => validateBusinessNumber(values.businessNumber)}
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
