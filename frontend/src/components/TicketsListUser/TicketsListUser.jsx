import React, { useEffect } from 'react'
import axios from 'axios'
import styles from './styles/TicketsListUser.module.css'
import { Link } from 'react-router-dom'

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

    const page = 1
    const limit = 10

    useEffect(() => {
        console.log(localStorage.getItem('token'))
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/tickets?page=${page}&limit=${limit}`, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImpvaG4xMjM0IiwibmFtZSI6ImR3ZHdkZHdkdyIsInN1cm5hbWUiOiJ3ZHdkd2QiLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTcyNzcyMTczOSwiZXhwIjoxNzI4MzI2NTM5fQ.3wREoEqqJmJ_v-4q9IeWXOGpENrNXjRPkjGzYIFM448'
                    },
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [])

  return (
    <div className={styles.ticket__list__user}>
      <div className={`${styles.ticket__list__user__container} _container`}>
        <Link to={'/ticket-watch-page-user/1'}>
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
        </Link>
        <Link to={'/ticket-watch-page-user/2'}>
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
        </Link>
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
