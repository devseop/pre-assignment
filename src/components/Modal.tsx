import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Components.module.css';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: IModal) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <button onClick={onClose} className={styles.modalCloseButton}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
