import React from 'react'
import styles from './styles/MainPageAdmin.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import SearchAndSortAdmin from '../../components/SearchAndSortAdmin/SearchAndSortAdmin'
import TicketsListAdmin from '../../components/TicketsListAdmin/TicketsListAdmin'

function MainPageAdmin() {
  return (
    <div className={styles.main_page__admin}>
        <HeaderWithLine />
        <SearchAndSortAdmin />
        <TicketsListAdmin />
        <BouncingBalls />
    </div>
  )
}

export default MainPageAdmin
