import React from 'react'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import styles from './styles/TicketCreationPageUser.module.css'
import arrow_left from '../../../images/arrow_left.svg'
import { Link } from 'react-router-dom'
import TicketCreationForm from '../../components/TicketCreationForm/TicketCreationForm'

function TicketCreationPageUser() {
  return (
    <div className={styles.ticket__creation__page__user}>
        <HeaderWithLine />
        <div className={styles.ticket__creation__page__user__back__btn__container}>
            <Link to={'/main-page-user'} className={styles.ticket__creation__page__user__back__btn__link}>
                <img src={arrow_left} alt="" />
                <div className={styles.ticket__creation__page__user__back__btn__text}>Назад</div>
            </Link>
        </div>
        <TicketCreationForm />
        <BouncingBalls />
    </div>
  )
}

export default TicketCreationPageUser
