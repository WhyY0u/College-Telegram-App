import React from 'react'
import styles from './styles/NewsPageUser.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import NewsListUser from '../../components/NewsListUser/NewsListUser'

function NewsPageUser() {
  return (
    <div className={styles.news__page__user}>
        <HeaderWithLine />
        <NewsListUser />
        <BouncingBalls />
    </div>
  )
}

export default NewsPageUser
