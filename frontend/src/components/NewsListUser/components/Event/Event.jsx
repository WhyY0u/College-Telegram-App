import React, { useState } from 'react'
import styles from './stlye/Event.module.css'
import schedule from '../../../../../images/artworks-yHzRp6XJGtqtLAM2-0z0kIQ-t500x500.jpg';
import ithub from '../../../../../images/ithub.jpg'
import homelander from '../../../../../images/NewsListUser/Event/homelander.png';
import arrow_left from '../../../../../images/NewsListUser/Event/arrow_left.svg';
import download_icon from '../../../../../images/NewsListUser/Event/download_icon.svg';


function Event({ date, description, heading, img, place, start }) {
  const newDate = new Date(date);
  const newDateStart = new Date(start);

  newDate.setHours(newDate.getHours() + 4);
  newDateStart.setHours(newDateStart.getHours() + 4);

  const formatDate = () => {
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [images, setImages] = useState(img || []);
  const [current, setCurrent] = useState(-1);

  const handleImageClicked = (index) => {
    setCurrent(index);
  };

  const handleImageClose = () => {
    setCurrent(-1);
  };

  const displayedImages = images.length > 3 ? images.slice(0, 3) : images;

  const imageURLs = displayedImages.map((image) => {
    const url = typeof image === 'string' ? image : URL.createObjectURL(image);
    console.log('Image URL:', url);
    return url;
});

  return (
    <div className={`${styles.news__list__user__on__today__block} ${styles.on__today__block}`}>
      <div className={`${styles.on__today__block__card} ${styles.card}`}>
        <div className={styles.card__block}>
          <div className={styles.card__block__text}>
            <div className={styles.card__block__text__main}>
              <span>{heading}</span>
              <p>Мероприятие</p>
            </div>
            <div className={styles.card__block__text__date}>{formatDate()}</div>
          </div>
          <div className={styles.card__block__description}>{description}</div>

          <div className={`${styles.card__block__image__micro} ${styles.image__micro}`}>
            {imageURLs.map((image, index) => (
              <img onClick={() => handleImageClicked(index)} key={index} className={styles.image__micro__img} src={image} alt={index} />
            ))}
            {displayedImages.length < images.length && (
              <div onClick={() => setCurrent(0)} className={styles.image__micro__limit}>+{images.length - displayedImages.length}</div>
            )}
          </div>
        </div>
        <div className={styles.card__extra}>
          <div className={styles.card__extra__time}>
            <span>Время проведения</span>
            <p>{newDateStart.toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
          </div>
          <div className={styles.card__extra__place}>
            <span>Место</span>
            <p>{place}</p>
          </div>
        </div>
      </div>

      {current !== -1 && (
        <div className={`${styles.card__block__image__macro} ${styles.image__macro}`}>
          <div className={styles.image__macro__container}>
            <div className={`${styles.image__macro__btn__block} ${styles.btn__block}`}>
              <img src={arrow_left} alt='arrow left' onClick={handleImageClose} className={styles.btn__block__close__btn} />
              <a className={styles.btn__block__download__btn} href={imageURLs[current]} download>
                <img className={styles.btn__block__download__btn__img} src={download_icon} alt="" />
              </a>
            </div>
            <div className={styles.image__macro__wrapper}>
              <img className={styles.image__macro__img} src={imageURLs[current]} alt="nt bb" />
            </div>
            <div className={styles.image__macro__wrapper__container}>
              <div className={styles.image__macro__images}>
                {imageURLs.map((image, index) => (
                  <img onClick={() => handleImageClicked(index)} key={index} className={`${styles.image__micro__img} ${styles.image__micro__img__slider}`} src={image} alt={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;