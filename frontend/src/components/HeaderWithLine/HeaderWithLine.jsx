import React from 'react'
import styles from './styles/HeaderWithLine.module.css'
import { useNavigate } from 'react-router-dom'

function HeaderWithLine() {

  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className={styles.header__with__line}>
        <div className={`${styles.header__with__line__container} _container`}>
            <h2 className={styles.header__with__line__title}><span className={styles.header__with__line__letter}>K</span>IT</h2>
            <h2 className={styles.header__with__line__description}>AITU</h2>
            {/* <button onClick={() => Logout()}>Log out</button> */}
        </div>
    </header>
  )
}

export default HeaderWithLine
