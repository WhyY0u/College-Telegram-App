import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/TicketsListUser.module.css';
import { Link } from 'react-router-dom';
import { statusColorChecker, typeColorChecker } from '../../utils/ColorsChecker/ColorsChecker';
import TicketNavigate from './components/TicketNavigate/TicketNavigate';
import NotFoundTicket from './components/NotFoundTicket/NotFoundTicket';


const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function TicketsListUser() {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 5;
    const fetchData = async (page) => {
        try {
            const response = await axios.get(`http://${backendServer}/user/tickets?page=${page}&limit=${limit}`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setData(response?.data?.tickets);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
        }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Функция для получения видимых страниц
    const getVisiblePages = () => {
        const pages = [];
        const maxVisiblePages = 4; // Максимальное количество видимых страниц

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - (maxVisiblePages - 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Добавляем многоточие, если необходимо
        if (startPage > 1) {
            pages.unshift('...');
        }
        if (endPage < totalPages) {
            pages.push('...');
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    const truncateText = (text) => {
        return text?.length > 12 ? text.slice(0, 12) + '...' : text
    }


    return (
        <div className={styles.ticket__list__user}>
            <div className={`${styles.ticket__list__user__container} _container`}>
                <div className={styles.ticket__list__user__items__container}>
                    {data?.map((ticket) => (
                        <Link key={ticket?._id} to={`/ticket-watch-page-user/${ticket?._id}`}>
                            <div className={`${styles.ticket__list__user__item} ${styles.item}`}>
                                <div className={styles.item__name__block}>
                                    <h6 className={styles.item__name__block__title}>Название</h6>
                                    <p className={styles.item__name__block__title__name}>{truncateText(ticket?.heading)}</p>
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
                {totalPages != 0 ? <TicketNavigate handlePageChange={handlePageChange} currentPage={currentPage} visiblePages={visiblePages} totalPages={totalPages}/>: <NotFoundTicket/>}
            </div>
        </div>
    );
}

export default TicketsListUser;
