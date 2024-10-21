import React from 'react'
import styles from './styles/NewsCreationPage.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import NewsCreationForm from '../../components/NewsCreationForm/NewsCreationForm'
import ithub from '../../../images/ithub.jpg'
import Background from '../../components/BackgroundGlobal/Background'

function NewsCreationPage() {
  return (
    <div className={styles.news__creation__page}>
      <Background src={ithub}>
        <HeaderWithLine />
        <NewsCreationForm />
      </Background>
    </div>
  )
}

export default NewsCreationPage
    