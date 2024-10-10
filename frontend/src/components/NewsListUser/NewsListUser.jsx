import React, { useState } from 'react';
import styles from './styles/NewsListUser.module.css';
import grey_heart from '../../../images/grey_heart.png';
import red_heart from '../../../images/red_heart.png';
import schedule from '../../../images/artworks-yHzRp6XJGtqtLAM2-0z0kIQ-t500x500.jpg';
import ithub from '../../../images/ithub.jpg'
import schedule_stretched from '../../../images/schedule_stretched.png';
import homelander from '../../../images/homelander.png';
import arrow_left from '../../../images/NewsListUser/Event/arrow_left.svg';
import download_icon from '../../../images/NewsListUser/Event/download_icon.svg';
import Event from './components/Event/Event';

function NewsListUser() {
  const [images, setImages] = useState([schedule, homelander, ithub, schedule]);
  const [current, setCurrent] = useState(-1);

  const handleImageClicked = (index) => {
    setCurrent(index)
  }

  const handleImageClose = () => {
    setCurrent(-1)
  }

  const areImagesMoreThanLimit = () => {
    return images.length > 3 ? images.slice(0, 3) : images;
  }

  const displayedImages = areImagesMoreThanLimit();
    

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
                    {displayedImages?.map((image, index) => (
                      <img
                        onClick={() => handleImageClicked(index)}
                          key={index}
                          className={`${styles.img__row__row__image} `}
                          src={image}
                          alt=""
                      />
                    ))}
                  </div>
                  {displayedImages.length < images.length && (
                    <div onClick={() => setCurrent(0)} className={styles.img__row__likes__digit}>+{images.length - displayedImages.length}</div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {current !== -1 && 
          <div className={`${styles.news__list__user__image__macro} ${styles.image__macro}`}>
            <div className={styles.image__macro__container}>
              <div className={`${styles.image__macro__btn__block} ${styles.btn__block}`}>
                <img src={arrow_left} alt='arrow left' onClick={() => handleImageClose()} className={styles.btn__block__close__btn} />
                <a className={styles.btn__block__download__btn} href={images[current]} download>
                  <img className={styles.btn__block__download__btn__img} src={download_icon} alt="" />
                </a>
              </div>
              <div className={styles.image__macro__wrapper}>
                <img className={styles.image__macro__img} src={images[current]} alt="nt bb" />
              </div>
              <div className={styles.image__macro__wrapper__container}>
                <div className={styles.image__macro__images}>
                  {images?.map((image, index) => (
                      <img onClick={() => handleImageClicked(index)} key={index} className={`${styles.image__micro__img} ${styles.image__micro__img__slider}`} src={image} alt={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default NewsListUser;
