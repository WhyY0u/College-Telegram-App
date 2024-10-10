import React, { useEffect, useState } from 'react';
import styles from './styles/TicketsListAdmin.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TicketNavigate from './components/TicketNavigate/TicketNavigate';
import NotFoundTicket from './components/NotFoundTicket/NotFoundTicket';

function TicketsListAdmin({ searchQuery, sortType }) {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 5;

    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение',
    });

    const STATUS = Object.freeze({
        rejected: 'Отказано',
        done: 'Выполнено',
        inProgress: 'Выполняется',
        expectation: 'Ожидание',
    });

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`http://localhost:3000/confidant/tickets?page=${page}&limit=${limit}`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Изменяем статус на "ожидание", если он равен "отправлено"
            const ticketsWithUpdatedStatus = response?.data?.tickets.map(ticket => ({
                ...ticket,
                status: ticket.status === 'Отправлено' && ticket.status !== STATUS.expectation ? STATUS.expectation : ticket.status,
            }));
            console.log('tickets:', response?.data?.tickets);
            console.log('Updated tickets:', ticketsWithUpdatedStatus);

            setData(ticketsWithUpdatedStatus);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const filteredTickets = data?.filter(ticket => 
        ticket?.heading?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    const statusOrder = {
        Выполняется: 1,
        Отказано: 2,
        Выполнено: 3,
        Ожидание: 4,
    };

    const typeOrder = {
        Жалоба: 1,
        Предложение: 2,
    };

    const sortedTickets = filteredTickets?.sort((a, b) => {
        if (sortType === 'Статус') {
            return statusOrder[a.status] - statusOrder[b.status] || typeOrder[a.type] - typeOrder[b.type];
        } else if (sortType === 'Тип') {
            return typeOrder[a.type] - typeOrder[b.type] || statusOrder[a.status] - statusOrder[b.status];
        }
        return 0;
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
        <div className={styles.ticket__list__admin}>
            <div className={`${styles.ticket__list__admin__container}`}>
                <div className={styles.ticket__list__admin__items__container}>
                    {sortedTickets?.map((ticket, index) => (
                        <Link key={index} to={`/ticket-watch-page-admin/${ticket?._id}`}>
                            <div className={`${styles.ticket__list__admin__item} ${styles.item}`}>
                                <div className={styles.item__name__block}>
                                    <h6 className={styles.item__name__block__title}>Название</h6>
                                    <p className={styles.item__name__block__title__name}>{truncateText(ticket?.heading)}</p>
                                </div>
                                <div className={styles.item__stick__element}></div>
                                <div className={styles.item__type__block}>
                                    <h6 className={styles.item__type__block__title}>Тип</h6>
                                    <p 
                                        className={ ticket.type === 'Жалоба' ? styles.item__type__block__title__name__complaint : 
                                            ticket.type === 'Предложение' ? styles.item__type__block__title__name__offer : '' }
                                    >{ticket.type}</p>
                                </div>
                                <div className={styles.item__stick__element}></div>
                                <div className={styles.item__status__block}>
                                    <h6 className={styles.item__status__block__title}>Статус</h6>
                                    <p className={
                                        ticket.status === STATUS.rejected ? styles.item__status__block__title__name__rejected :
                                        ticket.status === STATUS.expectation ? styles.item__status__block__title__name__expectation :
                                        ticket.status === STATUS.inProgress ? styles.item__status__block__title__name__inProgress :
                                        ticket.status === STATUS.done ? styles.item__status__block__title__name__done :
                                        '' }
                                    >{ticket.status}</p>
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

export default TicketsListAdmin;
