import React from 'react'
import styles from './styles/TicketWatchPageUser.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import { useParams } from 'react-router-dom'
import TicketWatchFormUser from '../../components/TicketWatchFormUser/TicketWatchFormUser'
import Navigation from '../../components/Navigation/Navigation'

function TicketWatchPageUser() {


  return (
    <div className={styles.ticket__watch__page__user}>
        <HeaderWithLine />
        <TicketWatchFormUser />
        <div className={`${styles.ticket__watch__page__user__navigation__container} _container`}>
          <Navigation />
        </div>
        <BouncingBalls />
    </div>
  )
}

export default TicketWatchPageUser
