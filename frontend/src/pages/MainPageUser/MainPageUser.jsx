import React from 'react'
import styles from './styles/MainPageUser.module.css'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import TicketsListUser from '../../components/TicketsListUser/TicketsListUser'
import AddTicketButtonUser from '../../components/AddTicketButtonUser/AddTicketButtonUser'

function MainPageUser() {
  return (
    <div className={styles.main__page__user}>
        <HeaderWithLine />
        <TicketsListUser />
        <div className='_container'>

        <AddTicketButtonUser />
        </div>
        <BouncingBalls />
    </div>
  )
}

export default MainPageUser
