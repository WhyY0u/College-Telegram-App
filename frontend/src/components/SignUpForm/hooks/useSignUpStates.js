import { useState } from "react";

export const useSignUpStates = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const [isPasswordConfVisible, setIsPasswordConfVisible] = useState(false);
  const [isConfClicked, setConfClicked] = useState(false);


  const [nameValue, setNameValue] = useState('')
  const [surnameValue, setSurnameValue] = useState('')
  const [middlenameValue, setMiddlenameValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordConfValue, setPasswordConfValue] = useState('')  

  
  const handleNameChange = (event) => {
    setNameValue(event.target.value)
  }

  const handleSurnameChange = (event) => {
    setSurnameValue(event.target.value)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  const handlePasswordConfChange = (event) => {
    setPasswordConfValue(event.target.value)
  }

  const handleMiddlenameChange = (event) => {
    setMiddlenameValue(event.target.value)
  }


  const isNameEmpty = () => {
    return nameValue.trim() === ''
  }

  const isSurnameEmpty = () => {
    return surnameValue.trim() === ''
  }

  const isInputEmpty = () => {
    return inputValue.trim() === '';
  }

  const isEmailEmpty = () => {
    return emailValue.trim() === ''
  }

  const isPasswordEmpty = () => {
    return passwordValue.trim() === ''
  }

  const isPasswordConfEmpty = () => {
    return passwordConfValue.trim() === '';
  }

  const isMiddlenameEmpty = () => {
    return middlenameValue.trim() === '';
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  };

  const togglePasswordConfVisibility = () => {
    setIsPasswordConfVisible(!isPasswordConfVisible)
  }


  return {
    isPasswordVisible,
    isPasswordConfVisible,
    isClicked,
    isConfClicked,
    nameValue,
    surnameValue,
    middlenameValue,
    inputValue,
    emailValue,
    passwordValue,
    passwordConfValue,
    setClicked,
    setConfClicked,
    handleNameChange,
    handleSurnameChange,
    handleMiddlenameChange,
    handleInputChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfChange,
    isNameEmpty,
    isSurnameEmpty,
    isMiddlenameEmpty,
    isInputEmpty,
    isEmailEmpty,
    isPasswordEmpty,
    isPasswordConfEmpty,
    togglePasswordVisibility,
    togglePasswordConfVisibility
    }
}