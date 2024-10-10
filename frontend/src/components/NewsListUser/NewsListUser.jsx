import React, { useState } from 'react';
import styles from './styles/NewsListUser.module.css';
import grey_heart from '../../../images/grey_heart.png';
import red_heart from '../../../images/red_heart.png';
import schedule from '../../../images/artworks-yHzRp6XJGtqtLAM2-0z0kIQ-t500x500.jpg';
import schedule_stretched from '../../../images/schedule_stretched.png';
import homelander from '../../../images/homelander.png';
import Event from './components/Event/Event';

function NewsListUser() {

    

  return (
    <div className={styles.news__list__user}>
      <div className={`${styles.news__list__user__container} _container`}>
    <Event/>

        <div className={`${styles.news__list__user__new__block} ${styles.new__block}`}>
          <div className={styles.new__block__text}>Лента</div>
          <div className={`${styles.new__block__item} ${styles.item}`}>
            <div className={styles.item__block}>
              <div className={styles.item__block__text}>
                <div className={styles.item__block__text__main}>
                  <span>Почтение памяти погибшим</span>
                  <p>Мероприятие</p>
                </div>
                <div className={styles.item__block__text__date}>08.03.2024</div>
              </div>
              <div className={styles.item__block__description}>
                Уважаймые студенты, хочу вас пригласить почтить память ветеранов 2-й мировой войны, по этому приглашаю вас сегодня в 13:00 в актовый зал, где мы почтим память героев, победивших фашизм.
              </div>
            </div>
            <div className={styles.item__extra}>
              <div className={styles.item__extra__time}>
                <span>Время проведения</span>
                <p>Пн, 30 сентября в 10:40</p>
              </div>
              <div className={styles.item__extra__place}>
                <span>Место</span>
                <p>aasdasdasdasdd</p>
              </div>
            </div>
          </div>

          <div className={`${styles.new__block__item__img} ${styles.item__img}`}>
            <div className={styles.item__block__img}>
              <div className={styles.item__block__text__img}>
                <div className={styles.item__block__text__main__img}>
                  <span>Обновленные звонки</span>
                  <p>Новость</p>
                </div>
                <div className={styles.item__block__text__date__img}>08.03.2024</div>
              </div>
              <div className={styles.item__block__description__images}>
                <div className={styles.item__block__description__img}>
                  Уважаймые студенты, хотим вас обрадовать, что мы обновили расписание звонков, добавив между 4-5 парой 30 минут перемены, чтобы вы успевали сходить покушать, если у вас с 3 или 4 пары. С уважением, Администрация колледжа.
                </div>
                <div className={`${styles.item__block__img__row} ${styles.img__row}`}>
                  <div className={styles.img__row__row}>
                    <div className={`${styles.img__row__row__image__modal}`} >
                        <img
                        className={`${styles.img__row__row__image}`}
                        src={schedule}
                        alt=""
                        />
                    </div>
                    <div className={`${styles.img__row__row__image__modal}`} >
                        <img
                        className={`${styles.img__row__row__image} `}
                        src={schedule}
                        alt=""
                        />
                    </div>
                    <div className={`${styles.img__row__row__image__modal}`} >
                    <img
                        className={`${styles.img__row__row__image} `}
                        src={schedule}
                        alt=""
                    />
                    </div>
                  </div>
                  <div className={styles.img__row__likes__digit}>+13</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsListUser;
