import React from 'react'
import styles from './styles/TicketWatchFormUser.module.css'
import ithub from '../../../images/ithub.jpg'
import { Link } from 'react-router-dom'

function TicketWatchFormUser() {

    const STATUS = Object.freeze({
        rejected: 'отказано',
        done: 'выполнено',
        inProgress: 'выполняется',
        sent: 'отправлено'
    })

    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение'
    })

  return (
    <div className={styles.ticket__watch__form__user}>
      <div className={`${styles.ticket__watch__form__user__container} _container`}>
        <div className={`${styles.ticket__watch__form__user__headers__block} ${styles.headers__block}`}>
            <div className={`${styles.headers__block__title__block} ${styles.title__block}`}>
                <h6 className={styles.title__block__header}>Название</h6>
                <p className={styles.title__block__parg}>Убрать пары</p>
            </div>
            <div className={`${styles.headers__block__type__block} ${styles.type__block}`}>
                <h6 className={styles.type__block__header}>Тип</h6>
                <p 
                    className={styles.type__block__parg}
                    style={TYPES.complaint ? {color: 'rgba(255, 0, 0, 0.43)'} : ''}
                >{TYPES.complaint}</p>
            </div>
            <div className={`${styles.headers__block__status__block} ${styles.status__block}`}>
                <h6 className={styles.status__block__header}>Статус</h6>
                <p 
                    className={styles.status__block__parg}
                    style={STATUS.rejected ? {color: 'rgba(235, 4, 4, 0.69)'} : ''}
                >{STATUS.rejected}</p>
            </div>
        </div>

        <div className={`${styles.ticket__watch__form__user__desc__block} ${styles.desc__block}`}>
            <div className={styles.desc__block__header}><span>Описание</span></div>
            <p className={styles.desc__block__description}>
            Место: Кабинет № 204
            <br />
            <br />
            Уважаемая администрация!
            <br />
            <br />
            Мы, ученики PO 232, обращаемся с просьбой обратить внимание на проблему, возникшую в нашем кабинете № 204. В последнее время одна из парт (номер 7) стала непригодной для использования
            </p>
        </div>

        <div className={`${styles.ticket__watch__form__user__image__block} ${styles.image__block}`}>
            <img className={styles.image__block__img} src={ithub} alt="uploaded" />
            <div className={styles.image__block__text}><span>Картинка</span></div>
        </div>

        <div className={`${styles.ticket__watch__form__user__comment__block} ${styles.comment__block}`}>
            <div className={styles.comment__block__header}>
                <span className={styles.comment__block__header__title}>Комментарий к ответу</span>
                <span className={styles.comment__block__header__author__name}>А.С.Пушкин</span>
            </div>
            <p className={styles.comment__block__response}>Захотелась</p>
        </div>  

        <div className={`${styles.ticket__watch__form__user__back__button__block} ${styles.back__button__block}`}>
            <Link 
                className={styles.back__button__block__btn}
                to={'/main-page-user'}
            >Назад</Link>
        </div>
      </div>
    </div>
  )
}

export default TicketWatchFormUser
