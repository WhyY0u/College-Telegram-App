import React, { useState } from 'react';
import styles from './styles/EyeIcon.module.css'; // Импортируем стили

const EyeIcon = (props) => {
    const 
    {   isOpen, 
        toggleEye, 
        isClicked
    } = props


  return (
    <div
      className={`${styles.eye_container} ${isOpen ? styles.open : styles.closed}`}
      onClick={toggleEye}
    >
      <div className={`${styles.eye} ${isClicked ? styles.look_right : ''}`}>
        <div className={`${styles.pupil} ${isOpen ? styles.open : styles.closed}`}></div>
      </div>
    </div>
  );
};

export default EyeIcon;
