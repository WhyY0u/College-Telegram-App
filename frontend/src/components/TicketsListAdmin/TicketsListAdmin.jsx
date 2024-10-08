import React, { useEffect, useState } from 'react'
import styles from './styles/TicketsListAdmin.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TicketsListAdmin({ searchQuery, sortType }) {

    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 5;

    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение'
    })

    const STATUS = Object.freeze({
        rejected: 'отказано',
        done: 'выполнено',
        inProgress: 'выполняется',
        expectation: 'ожидание'
    })

    const tickets = [
        { id: 1, name: 'Убрать пары', type: TYPES.complaint, status: STATUS.rejected },
        { id: 2, name: 'Убрать еду', type: TYPES.complaint, status: STATUS.rejected },
        { id: 3, name: 'Убрать игры', type: TYPES.offer, status: STATUS.expectation },
        { id: 4, name: 'Убрать игры', type: TYPES.offer, status: STATUS.inProgress },
        { id: 5, name: 'Убрать игры', type: TYPES.offer, status: STATUS.done },
    ]

    const fetchData = async (page) => {
        console.log(localStorage.getItem('token'))
        try {
            const response = await axios.get(`http://localhost:3000/confidant/tickets?page=${currentPage}&limit=${limit}`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setData(response?.data?.tickets);
            console.log(data)
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const filteredTickets = data?.filter(ticket => 
        // eslint-disable-next-line react/prop-types
        ticket?.heading?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    const statusOrder = {
        выполняется: 1,
        ожидание: 2,
        отказано: 3,
        выполнено: 4,
    }

    const typeOrder = {
        Жалоба: 1,
        Предложение: 2,
    }

    const sortedTickets = filteredTickets?.sort((a, b) => {
        if ( sortType === 'Статус' ) {
            return statusOrder[a.status] - statusOrder[b.status] || typeOrder[a.type] - typeOrder[b.type]
        } else if ( sortType === 'Тип' ) {
            return typeOrder[a.type] - typeOrder[b.type] || statusOrder[a.status] - statusOrder[b.status]
        }
        return 0
    })


  return (
    <div className={styles.ticket__list__admin}>
        <div className={`${styles.ticket__list__admin__container}`}>
            {sortedTickets?.map((ticket, index) => (
            <Link key={index} to={`/ticket-watch-page-admin/${ticket?._id}`}>
                <div className={`${styles.ticket__list__admin__item} ${styles.item}`}>
                    <div className={styles.item__name__block}>
                        <h6 className={styles.item__name__block__title}>Название</h6>
                        <p className={styles.item__name__block__title__name}>{ticket.heading}</p>
                    </div>
                    <div className={styles.item__stick__element}></div>
                    <div className={styles.item__type__block}>
                        <h6 className={styles.item__type__block__title}>Тип</h6>
                        <p 
                            className={ ticket.type === 'Жалоба' ? styles.item__type__block__title__name__complaint : ticket.type === 'Предложение' ? styles.item__type__block__title__name__offer : '' }
                        >{ticket.type}</p>
                    </div>
                    <div className={styles.item__stick__element}></div>
                    <div className={styles.item__status__block}>
                        <h6 className={styles.item__status__block__title}>Статус</h6>
                        <p 
                            className={ ticket.status === 'отказано' 
                                ? styles.item__status__block__title__name__rejected 
                                : ticket.status === 'ожидание' 
                                ? styles.item__status__block__title__name__expectation 
                                : ticket.status === 'выполняется' 
                                ? styles.item__status__block__title__name__inProgress
                                : ticket.status === 'выполнено'
                                ? styles.item__status__block__title__name__done
                                : '' }
                        >{ticket.status}</p>
                    </div>
                </div>
            </Link>
            ))}
         </div>
    </div>
  )
}

export default TicketsListAdmin
