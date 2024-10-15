import React from 'react'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import styles from './styles/TicketCreationPageUser.module.css'
import { Link } from 'react-router-dom'
import TicketCreationForm from '../../components/TicketCreationForm/TicketCreationForm'
import Navigation from '../../components/Navigation/Navigation'

function TicketCreationPageUser() {
  return (
    <div className={styles.ticket__creation__page__user}>
        <HeaderWithLine />
        <div className={styles.ticket__creation__page__user__back__btn__container}>
            <Link to={'/main-page-user'} className={styles.ticket__creation__page__user__back__btn__link}>
                <div className={styles.background_back}>
                <p className={styles.ticket__creation__page__user__back__btn__text}>{"<-"}</p>
                </div>
            </Link>
        </div>
        <TicketCreationForm />
        
        <div className={`${styles.ticket__creation__page__user__navigation__container} _container`}>
          <Navigation />
        </div>
    </div>
  )
}

export default TicketCreationPageUser
