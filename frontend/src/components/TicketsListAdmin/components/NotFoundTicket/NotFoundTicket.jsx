import React from 'react'
import styles from './styles/NotFoundTicket.module.css'
function NotFoundTicket() {
  return (
    <div className={styles.not__found__tickets}>
      <p className={styles.not_found_ticket_text}>Пока здесь нет тикетов</p>
      <p className={styles.not__found__tickets__mb__hidden}>Возможно, они спрятаны?</p>
    </div>
  )
}

export default NotFoundTicket