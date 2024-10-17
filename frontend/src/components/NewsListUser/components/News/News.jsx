import React, { useEffect, useState } from 'react'
import styles from './styles/News.module.css'
import arrow_left from '../../../../../images/NewsListUser/Event/arrow_left.svg';
import download_icon from '../../../../../images/NewsListUser/Event/download_icon.svg';
import axios from 'axios';


const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function News({description, heading, date, img}) {
    const newDate = new Date(date);
    const formatDate = () => {
        const day = String(newDate.getDate()).padStart(2, '0');
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
        const year = newDate.getFullYear();
        return `${day}.${month}.${year}`;
    };
    const [images, setImages] = useState(img || []);

    const fetchImgs = async () => {
      try {
        const imgUrls = []; 
    
        for (let i = 0; i < img.length; i++) {
          const response = await axios.get(`${backendServer}/image/getNewsImg/${img[i]}`, {
            responseType: 'blob',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          
          const imgBlob = new Blob([response.data], { type: response.headers['content-type'] });
          const imgUrl = URL.createObjectURL(imgBlob);
          imgUrls.push(imgUrl); 
        }
    
        setImages(imgUrls);
      } catch (error) {
        console.error("Ошибка при получении изображений:", error);
      }
    };
  
    useEffect(() => {
      fetchImgs();
    }, [img]);

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
    <>
    <div className={`${styles.new__block__item__img} ${styles.item__img}`}>
            <div className={styles.item__block__img}>
              <div className={styles.item__block__text__img}>
                <div className={styles.item__block__text__main__img}>
                  <span>{heading}</span>
                  <p>Новость</p>
                </div>
                <div className={styles.item__block__text__date__img}>{formatDate()}</div>
              </div>
              <div className={styles.item__block__description__images}>
                <div className={styles.item__block__description__img}>
                  {description}
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
          </>
  )
}

export default News