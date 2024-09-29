import React from 'react'
import styles from './styles/TicketWatchPageUser.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import { useParams } from 'react-router-dom'
import TicketWatchFormUser from '../../components/TicketWatchFormUser/TicketWatchFormUser'

function TicketWatchPageUser() {

    const { id } = useParams()

  return (
    <div className={styles.ticket__watch__page__user}>
        <HeaderWithLine />
        <TicketWatchFormUser />
        <BouncingBalls />
    </div>
  )
}

export default TicketWatchPageUser
