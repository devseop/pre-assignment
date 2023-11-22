import React from 'react';
import styles from '../styles/Components.module.css';

interface HelpMsgProps {
  isValid: boolean;
}

function HelpMsg({ isValid }: HelpMsgProps) {
  let text = '';
  if (isValid) {
    text = '올바른 양식입니다.';
  } else {
    text = '양식에 맞지 않습니다.';
  }

  return (
    <span
      className={`${styles.help} ${
        isValid ? `${styles.success}` : `${styles.error}`
      }`}
    >
      {text}
    </span>
  );
}

export default HelpMsg;
