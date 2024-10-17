import React from 'react'
import styles from './styles/Loader.module.css'
import drugalek from '../../../images/Loader/drugalek.gif'
import chasy from '../../../images/Loader/chasy.gif'

function Loader() {
  return (
    <div className={styles.loader}>
        <img className={styles.loader__img} src={chasy} alt="" />
        <div className={styles.loader__text__block}>
            <p className={styles.loader__text__block__text}>Загрузка</p>
            <div className={styles.loader__text__block__dots}>
                <p className={styles.loader__text__block__text__dot__one}>.</p>
                <p className={styles.loader__text__block__text__dot__two}>.</p>
                <p className={styles.loader__text__block__text__dot__three}>.</p>
            </div>
        </div>
    </div>
  )
}

export default Loader
