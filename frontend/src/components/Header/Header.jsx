import React from 'react'
import styles from './styles/Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
        <div className={`${styles.header__container} _container`}>
            <h2 className={styles.header__title}><span className={styles.header__title__letter}>K</span>IT</h2>
            <h2 className={styles.header__title__description}>AITU</h2>
        </div>
    </header>
  )
}

export default Header
