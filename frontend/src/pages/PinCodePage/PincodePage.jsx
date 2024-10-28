import React from 'react'
import styles from "./styles/PincodePage.module.css"
import PincodeForm from '../../components/PincodeForm/PincodeForm'
import Background from '../../components/Background/Background'
import ithub from "../../../images/ithub.jpg"

function PincodePage() {
  return (
    <div className={styles.pincode__page}>
      <Background src={ithub}>
        <PincodeForm />
      </Background>
    </div>
  )
}

export default PincodePage
