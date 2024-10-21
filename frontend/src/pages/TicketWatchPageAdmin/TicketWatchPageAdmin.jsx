import React from 'react'
import styles from './styles/TicketWatchPageAdmin.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import TicketWatchFormAdmin from '../../components/TicketWatchFormAdmin/TicketWatchFormAdmin'
import Navigation from '../../components/Navigation/Navigation'
import ithub from "../../../images/ithub.jpg"
import Background from '../../components/BackgroundGlobal/Background'

function TicketWatchPageAdmin() {
  return (
    <div className={styles.ticket__watch__page__admin}>
      <Background src={ithub}>
        <HeaderWithLine />
        <TicketWatchFormAdmin />
      </Background>
        <div className={`${styles.ticket__watch__page__admin__navigation__container} _container`}>
          <Navigation />
        </div>
    </div>
  )
}

export default TicketWatchPageAdmin
