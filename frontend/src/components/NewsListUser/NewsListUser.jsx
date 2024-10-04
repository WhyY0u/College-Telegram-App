import React from 'react'
import styles from './styles/NewsListUser.module.css'
import grey_heart from '../../../images/grey_heart.png'
import red_heart from '../../../images/red_heart.png'
import schedule from '../../../images/schedule.png'

function NewsListUser() {
  return (
    <div className={styles.news__list__user}>
      <div className={`${styles.news__list__user__container} _container`}>
        <div className={`${styles.news__list__user__on__today__block} ${styles.on__today__block}`}>
            <div className={styles.on__today__block__text}>
                На Сегодня
            </div>
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
                    Уважаймые студенты хочу вас пригласить почтить память ветираном 2 мировой войны по этому приглашаю вас сегодня в 13:00 в актовый зал где мы почтим память героем победивший фашизм
                    </div>
                </div>
                <div className={styles.card__extra}>
                    <div className={styles.card__extra__time}>
                        <span>Время провидения</span>
                        <p>Сегодня в 10:40</p>
                    </div>
                    <div className={styles.card__extra__place}>
                        <span>Место</span>
                        <p>Актовый Зал</p>
                    </div>
                    <div className={styles.card__extra__likes}>
                        <img className={styles.card__extra__likes__img} src={grey_heart} alt="" />
                        <div className={styles.card__extra__likes__digit}>13</div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`${styles.news__list__user__new__block} ${styles.new__block}`}>
            <div className={styles.new__block__text}>
                Новое
            </div>
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
                    Уважаймые студенты хочу вас пригласить почтить память ветираном 2 мировой войны по этому приглашаю вас сегодня в 13:00 в актовый зал где мы почтим память героем победивший фашизм
                    </div>
                </div>
                <div className={styles.item__extra}>
                    <div className={styles.item__extra__time}>
                        <span>Время провидения</span>
                        <p>Пн, 30 сентября в 10:40</p>
                    </div>
                    <div className={styles.item__extra__place}>
                        <span>Место</span>
                        <p>Zoom</p>
                    </div>
                    <div className={styles.item__extra__likes}>
                        <img className={styles.item__extra__likes__img} src={red_heart} alt="" />
                        <div className={styles.item__extra__likes__digit}>13</div>
                    </div>
                </div>
            </div>

            <div className={`${styles.new__block__item__img} ${styles.item__img}`}>
                <div className={styles.item__block__img}>
                    <div className={styles.item__block__text__img}>
                        <div className={styles.item__block__text__main__img}>
                            <span>Обновленые звонки</span>
                            <p>Новость</p>
                        </div>
                        <div className={styles.item__block__text__date__img}>08.03.2024</div>
                    </div>
                    <div className={styles.item__block__description__images}>
                        <div className={styles.item__block__description__img}>
                            Уважаймые студенты хотим вас обрадвать что мы обновили расписание звонков добавив между 4-5 парой 30 минут перемены чтобы вы успевали сходить покушать если у вас с 3 или 4 пары с уважением Администрация коледжа
                        </div>
                        <div className={`${styles.item__block__img__row} ${styles.img__row}`}>
                            <div className={styles.img__row__row}>
                                <img className={styles.img__row__row__image} src={schedule} alt="" />
                                <img className={styles.img__row__row__image} src={schedule} alt="" />
                                <img className={styles.img__row__row__image} src={schedule} alt="" />
                            </div>
                            <div className={styles.img__row__likes__digit}>+13</div>
                        </div>
                    </div>
                </div>
                <div className={styles.item__img__likes__block}>
                    <div className={styles.item__img__likes}>
                        <img className={styles.item__img__likes__img} src={red_heart} alt="" />
                        <div className={styles.item__img__likes__digit}>13</div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default NewsListUser
