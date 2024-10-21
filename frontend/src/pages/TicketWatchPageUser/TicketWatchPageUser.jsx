import React from 'react'
import styles from './styles/TicketWatchPageUser.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import { useParams } from 'react-router-dom'
import TicketWatchFormUser from '../../components/TicketWatchFormUser/TicketWatchFormUser'
import Navigation from '../../components/Navigation/Navigation'
import Background from '../../components/BackgroundGlobal/Background'
import ithub from "../../../images/ithub.jpg"


function TicketWatchPageUser() {


  return (
    <div className={styles.ticket__watch__page__user}>
      <Background src={ithub}>
        <HeaderWithLine />
        <TicketWatchFormUser />
      </Background>
        <div className={`${styles.ticket__watch__page__user__navigation__container} _container`}>
          <Navigation />
        </div>
    </div>
  )
}

export default TicketWatchPageUser
