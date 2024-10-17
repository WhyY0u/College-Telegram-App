import React from 'react'
import styles from './styles/TicketWatchPageAdmin.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import TicketWatchFormAdmin from '../../components/TicketWatchFormAdmin/TicketWatchFormAdmin'
import Navigation from '../../components/Navigation/Navigation'

function TicketWatchPageAdmin() {
  return (
    <div className={styles.ticket__watch__page__admin}>
        <HeaderWithLine />
        <TicketWatchFormAdmin />
        <div className={`${styles.ticket__watch__page__admin__navigation__container} _container`}>
          <Navigation />
        </div>
    </div>
  )
}

export default TicketWatchPageAdmin
