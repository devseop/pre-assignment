import React from 'react';
import styles from '../styles/Components.module.css';

interface InputProps {
  header: string;
  type: string;
  placeholder: string;
  notice?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  header,
  type,
  placeholder,
  notice,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <div className={styles.input_container}>
      <label className={styles.label}>{header}</label>
      {notice && <span className={styles.notice}>{notice}</span>}
      <input
        className={styles.input}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Input;
