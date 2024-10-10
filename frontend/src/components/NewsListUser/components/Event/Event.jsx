import React, { useState } from 'react'
import styles from './stlye/Event.module.css'
import schedule from '../../../../../images/artworks-yHzRp6XJGtqtLAM2-0z0kIQ-t500x500.jpg';

function Event() {
    const [image, setImage] = useState({ src: null, id: null });
    const [currntImg, setCurrntImg] = useState(0);
  return (
    <div className={`${styles.news__list__user__on__today__block} ${styles.on__today__block}`}>
    <div className={styles.on__today__block__text}>На Сегодня</div>
    <div className={`${styles.on__today__block__card} ${styles.card}`}>
      <div className={styles.card__block}>
        <div className={styles.card__block__text}>
          <div className={styles.card__block__text__main}>
            <span>Почтение памяти погибшим</span>
            <p>Мероприятие</p>
          </div>
          <div className={styles.card__block__text__date}>08.03.2024</div>
        </div>
        <div className={styles.card__block__description}>
          Уважаймые студенты, хочу вас пригласить почтить память ветеранов 2-й мировой войны, по этому приглашаю вас сегодня в 13:00 в актовый зал, где мы почтим память героев, победивших фашизм.
        </div>
        <img className={styles.image_micro} src={schedule}/>
        <img className={styles.image_micro} src={schedule}/>
        <img className={styles.image_micro} src={schedule}/>

      </div>
      <div className={styles.card__extra}>
        <div className={styles.card__extra__time}>
          <span>Время проведения</span>
          <p>Сегодня в 10:40</p>
        </div>
        <div className={styles.card__extra__place}>
          <span>Место</span>
          <p>Актовый Зал</p>
        </div>
      
      </div>
    </div>
  </div>
  )
}

export default Event