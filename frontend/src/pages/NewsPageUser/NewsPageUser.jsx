import React from 'react'
import jwt from 'jsonwebtoken'
import styles from './styles/NewsPageUser.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import NewsListUser from '../../components/NewsListUser/NewsListUser'
import Navigation from '../../components/Navigation/Navigation'
import ithub from '../../../images/ithub.jpg'
import Background from '../../components/BackgroundGlobal/Background'


function NewsPageUser() {

  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);

  return (
    <div className={styles.news__page__user}>
      <Background src={ithub}>
        <HeaderWithLine />
        <NewsListUser />
      </Background>
      <Navigation add={decodedToken.role == "Confidant"} to={'/news-creation-page'} />
    </div>
  )
}

export default NewsPageUser
