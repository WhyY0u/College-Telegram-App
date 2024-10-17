import React from 'react'
import jwt from 'jsonwebtoken'
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
        <div className={`${styles.main__page__user__navigation__container} _container`}>
          <Navigation add={true} to={'/ticket-creation-page-user'} />
        </div>
    </div>
  )
}

export default MainPageUser
