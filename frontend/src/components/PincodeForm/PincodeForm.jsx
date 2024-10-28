import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/PincodeForm.module.css';
import lock from './images/lock.svg';

function PincodeForm() {
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);

  const handleNumberClick = (number) => {
    const newInputs = [...inputs];
    const firstEmptyIndex = newInputs.findIndex(input => input === '');

    if (firstEmptyIndex !== -1) {
      newInputs[firstEmptyIndex] = number;
      setInputs(newInputs);
    }
  };

  const handleBackspace = () => {
    const newInputs = [...inputs]; // Копируем текущее состояние

    // Идем в обратном порядке
    for (let i = newInputs.length - 1; i >= 0; i--) {
        if (newInputs[i] !== '') {
            newInputs[i] = ''; // Очищаем первый найденный элемент с конца
            break; // Выходим из цикла после очистки
        }
    }

    setInputs(newInputs); // Обновляем состояние
};




  return (
    <div className={styles.pincode__form}>
      <div className={`${styles.pincode__form__container} _container`}>
        <div className={`${styles.pincode__form__recognizing__block} ${styles.recognizing__block}`}>
          <div className={`${styles.recognizing__block__recognition} ${styles.recognition}`}>
            <img className={styles.recognition__img} src={lock} alt="" />
            <div className={styles.recognition__text}>Введите Pin Code</div>
          </div>
          <div className={`${styles.recognizing__block__dots} ${styles.dots}`}>
            {inputs.map((input, index) => (
              <input
                type="password"
                key={index}
                className={ input !== '' ? styles.dots__item__filled : styles.dots__item}
                value={input}
                readOnly
              />
            ))}
          </div>
        </div>

        <div className={`${styles.pincode__form__numbers__block} ${styles.numbers__block}`}>
          {Array.from({ length: 3 }, (_, i) => (
            <div className={styles.numbers__block__block} key={i}>
              {[1, 2, 3].map(num => (
                <div className={styles.numbers__block__item} key={num} onClick={() => handleNumberClick(num)}>
                  {num + i * 3}
                </div>
              ))}
            </div>
          ))}
          <div className={`${styles.numbers__block__block} ${styles.numbers__block__block__text}`}>
            <Link to={'/iin-page'}>
              <div className={`${styles.numbers__block__item} ${styles.numbers__block__item__text} ${styles.numbers__block__item__text__back}`}>
                Назад
              </div>
            </Link>
            <div className={styles.numbers__block__item} onClick={() => handleNumberClick(0)}>
              0
            </div>
            <div className={`${styles.numbers__block__item} ${styles.numbers__block__item__text} ${styles.numbers__block__item__text__delete}`} onClick={handleBackspace}>
              Удалить
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PincodeForm