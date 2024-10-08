import React from 'react'
import styles from './styles/ProfilePage.module.css'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import Navigation from '../../components/Navigation/Navigation'
import ProfileForm from '../../components/ProfileForm/ProfileForm'

function ProfilePage() {
  return (
    <div className={styles.profile__page}>
        <HeaderWithLine />  
        <ProfileForm />
        <div className={`${styles.profile__page__navigation__container} _container`}>
          <Navigation />
        </div>
        <BouncingBalls />
    </div>
  )
}

export default ProfilePage
