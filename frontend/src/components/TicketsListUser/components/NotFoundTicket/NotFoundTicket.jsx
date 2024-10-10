import React from 'react'
import styles from './style/NotFoundTicket.module.css'
function NotFoundTicket() {
  return (
    <div>
      <p className={styles.not_found_ticket_text}>Пока здесь нет тикетов</p>
      <p className={styles.mb_hiden_tickets_text}>Возможно, они спрятаны?</p>
    </div>
  )
}

export default NotFoundTicket