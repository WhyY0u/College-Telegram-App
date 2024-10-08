import React from 'react'
import styles from './styles/HeaderWithLine.module.css'

function HeaderWithLine() {

  return (
    <header className={styles.header__with__line}>
        <div className={`${styles.header__with__line__container} _container`}>
            <h2 className={styles.header__with__line__title}><span className={styles.header__with__line__letter}>K</span>IT</h2>
            <h2 className={styles.header__with__line__description}>Mini App</h2>
        </div>
    </header>
  )
}

export default HeaderWithLine
