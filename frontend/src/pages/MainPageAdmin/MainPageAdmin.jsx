import React, { useState } from 'react'
import styles from './styles/MainPageAdmin.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import SearchAndSortAdmin from '../../components/SearchAndSortAdmin/SearchAndSortAdmin'
import TicketsListAdmin from '../../components/TicketsListAdmin/TicketsListAdmin'
import Navigation from '../../components/Navigation/Navigation'
import Background from '../../components/BackgroundGlobal/Background'
import ithub from '../../../images/ithub.jpg'

function MainPageAdmin() {

  const [searchQuery, setSearchQuery] = useState('')
  const [sortType, setSortType] = useState('Тип')

  const handleSeacrh = (query) => {
    setSearchQuery(query)
  } 

  const handleSort = (type) => {
    setSortType(type)
  }

  return (
    <div className={styles.main_page__admin}>
        <Background src={ithub}>
          <HeaderWithLine />
          <SearchAndSortAdmin 
            onSearch={handleSeacrh} 
            onSort={handleSort}
          />
          <TicketsListAdmin 
            searchQuery={searchQuery} 
            sortType={sortType}
          />
        </Background>
        <div className={`${styles.main_page__admin__navigation__container} _container`}>
            <Navigation />
        </div>
      </div>

  )
}

export default MainPageAdmin
