import React from 'react'
import styles from './styles/NewsCreationPage.module.css'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import NewsCreationForm from '../../components/NewsCreationForm/NewsCreationForm'

function NewsCreationPage() {
  return (
    <div className={styles.news__creation__page}>
        <HeaderWithLine />
        <NewsCreationForm />
    </div>
  )
}

export default NewsCreationPage
    