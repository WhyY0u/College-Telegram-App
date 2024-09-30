import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/AddTicketButtonUser.module.css'
import plus_icon from '../../../images/plus_icon.svg'

function AddTicketButtonUser() {
  return (
    <Link to={'/ticket-creation-page-user'} className={styles.add__ticket__btn}>
        <img className={styles.add__ticket__btn__img} src={plus_icon} alt="" />
    </Link>
  )
}

export default AddTicketButtonUser
