import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles/TicketsListUser.module.css'
import { Link } from 'react-router-dom'
import { statusColorChecker, typeColorChecker } from '../../utils/ColorsChecker/ColorsChecker'

function TicketsListUser() {
    const [data, setData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const limit = 5

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/tickets?page=${currentPage}&limit=${limit}`, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                console.log(response?.data)
                setData(response?.data)
                setTotalPages(Math.ceil(response?.data?.totalPages / limit)); // предположим, что ваш API возвращает общее количество записей
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [currentPage]) // добавляем currentPage в зависимости


    // Функция для смены страницы
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

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
