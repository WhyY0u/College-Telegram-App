import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles/TicketsListUser.module.css'
import { Link } from 'react-router-dom'
import { statusColorChecker, typeColorChecker } from '../../utils/ColorsChecker/ColorsChecker'

function TicketsListUser() {
    const [data, setData] = useState(null)

    const page = 1
    const limit = 10

    useEffect(() => {
        console.log(localStorage.getItem('token'))
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/tickets?page=${page}&limit=${limit}`, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                setData(response?.data)
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
        {data?.tickets.map((ticket) => (
            <Link key={ticket?._id} to={`/ticket-watch-page-user/${ticket?._id}`}>
                <div className={`${styles.ticket__list__user__item} ${styles.item}`}>
                    <div className={styles.item__name__block}>
                        <h6 className={styles.item__name__block__title}>Название</h6>
                        <p className={styles.item__name__block__title__name}>{ticket?.heading}</p>
                    </div>
                    <div className={styles.item__stick__element}></div>
                    <div className={styles.item__type__block}>
                        <h6 className={styles.item__type__block__title}>Тип</h6>
                        <p 
                            className={styles.item__type__block__title__name}
                            style={typeColorChecker(ticket?.type)}
                        >{ticket?.type}</p>
                    </div>
                    <div className={styles.item__stick__element}></div>
                    <div className={styles.item__status__block}>
                        <h6 className={styles.item__status__block__title}>Статус</h6>
                        <p 
                            className={styles.item__status__block__title__name}
                            style={statusColorChecker(ticket?.status)}
                        >{ticket?.status}</p>
                    </div>
                </div>
            </Link>
        ))}
        
      </div>
    </div>
  )
}

export default TicketsListUser
