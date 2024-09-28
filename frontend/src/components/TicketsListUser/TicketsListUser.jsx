import React from 'react'
import styles from './styles/TicketsListUser.module.css'
import AddTicketButtonUser from '../AddTicketButtonUser/AddTicketButtonUser'

function TicketsListUser() {
    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение'
    })

    const STATUS = Object.freeze({
        rejected: 'отказано',
        done: 'выполнено',
        inProgress: 'выполняется',
        sent: 'отправлено'
    })

  return (
    <div className={styles.ticket__list__user}>
      <div className={`${styles.ticket__list__user__container} _container`}>
        <div className={`${styles.ticket__list__user__item} ${styles.item}`}>
            <div className={styles.item__name__block}>
                <h6 className={styles.item__name__block__title}>Название</h6>
                <p className={styles.item__name__block__title__name}>Убрать пары</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__type__block}>
                <h6 className={styles.item__type__block__title}>Тип</h6>
                <p 
                    className={styles.item__type__block__title__name}
                    style={TYPES.complaint ? {color: 'rgba(255, 0, 0, 0.43)'} : ''}
                >{TYPES.complaint}</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__status__block}>
                <h6 className={styles.item__status__block__title}>Статус</h6>
                <p 
                    className={styles.item__status__block__title__name}
                    style={STATUS.rejected ? {color: 'rgba(235, 4, 4, 0.69)'} : ''}
                >{STATUS.rejected}</p>
            </div>
        </div>
        <div className={`${styles.ticket__list__user__item} ${styles.item}`}>
            <div className={styles.item__name__block}>
                <h6 className={styles.item__name__block__title}>Название</h6>
                <p className={styles.item__name__block__title__name}>Убрать пары</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__type__block}>
                <h6 className={styles.item__type__block__title}>Тип</h6>
                <p 
                    className={styles.item__type__block__title__name}
                    style={TYPES.offer ? {color: 'rgba(0, 141, 255, 0.43)'} : ''}
                >{TYPES.offer}</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__status__block}>
                <h6 className={styles.item__status__block__title}>Статус</h6>
                <p 
                    className={styles.item__status__block__title__name}
                    style={STATUS.done ? {color: 'rgba(4, 235, 36, 0.69)'} : ''}
                >{STATUS.done}</p>
            </div>
        </div>
        <div className={`${styles.ticket__list__user__item} ${styles.item}`}>
            <div className={styles.item__name__block}>
                <h6 className={styles.item__name__block__title}>Название</h6>
                <p className={styles.item__name__block__title__name}>Убрать пары</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__type__block}>
                <h6 className={styles.item__type__block__title}>Тип</h6>
                <p 
                    className={styles.item__type__block__title__name}
                    style={TYPES.offer ? {color: 'rgba(0, 141, 255, 0.43)'} : ''}
                >{TYPES.offer}</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__status__block}>
                <h6 className={styles.item__status__block__title}>Статус</h6>
                <p 
                    className={styles.item__status__block__title__name}
                    style={STATUS.inProgress ? {color: 'rgba(4, 131, 235, 0.69)', transform: 'translateX(8%)'} : ''}
                >{STATUS.inProgress}</p>
            </div>
        </div>
        <div className={`${styles.ticket__list__user__item} ${styles.item}`}>
            <div className={styles.item__name__block}>
                <h6 className={styles.item__name__block__title}>Название</h6>
                <p className={styles.item__name__block__title__name}>Убрать пары</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__type__block}>
                <h6 className={styles.item__type__block__title}>Тип</h6>
                <p 
                    className={styles.item__type__block__title__name}
                    style={TYPES.offer ? {color: 'rgba(0, 141, 255, 0.43)'} : ''}
                >{TYPES.offer}</p>
            </div>
            <div className={styles.item__stick__element}></div>
            <div className={styles.item__status__block}>
                <h6 className={styles.item__status__block__title}>Статус</h6>
                <p 
                    className={styles.item__status__block__title__name}
                    style={STATUS.sent ? {color: 'rgba(234, 237, 43, 0.69)', transform: 'translateX(2%)'} : {color: ''}}
                >{STATUS.sent}</p>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default TicketsListUser