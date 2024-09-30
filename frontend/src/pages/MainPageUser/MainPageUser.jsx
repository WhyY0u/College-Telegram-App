import React from 'react'
import styles from './styles/MainPageUser.module.css'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import TicketsListUser from '../../components/TicketsListUser/TicketsListUser'
import Navigation from '../../components/Navigation/Navigation'

function MainPageUser() {
  return (
    <div className={styles.main__page__user}>
        <HeaderWithLine />
        <TicketsListUser />
        <div className='_container'>

          <Navigation />
        </div>
        <BouncingBalls />
    </div>
  )
}

export default MainPageUser
