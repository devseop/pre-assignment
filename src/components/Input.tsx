import React from 'react';
import HelpMsg from './HelpMsg';
import styles from '../styles/Components.module.css';

interface InputProps {
  header: string;
  type: string;
  placeholder: string;
  notice?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: () => boolean;
}

function Input({
  header,
  type,
  placeholder,
  notice,
  name,
  value,
  onChange,
  isValid,
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
      {value.length > 0 && <HelpMsg isValid={isValid()} />}
    </div>
  );
}

export default Input;
