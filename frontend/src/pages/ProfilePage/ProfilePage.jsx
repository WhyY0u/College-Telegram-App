import React from 'react'
import styles from './styles/ProfilePage.module.css'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'
import HeaderWithLine from '../../components/HeaderWithLine/HeaderWithLine'
import Navigation from '../../components/Navigation/Navigation'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import Background from '../../components/BackgroundGlobal/Background'
import ithub from '../../../images/ithub.jpg'


function ProfilePage() {
  return (
    <div className={styles.profile__page}>
      <Background src={ithub}>
        <HeaderWithLine />  
        <ProfileForm />
      </Background>
        <div className={`${styles.profile__page__navigation__container} _container`}>
          <Navigation />
        </div>
    </div>
  )
}

export default ProfilePage
