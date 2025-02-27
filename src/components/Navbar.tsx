import React, { useState } from 'react'
import ResetButton from '../assets/reset.png'
import '../App.css'

type options = {
  value: string;
  label: string;
}

type props = {
  difficulty: string;
  setDifficulty: (difficulty:string) => void;
}

const Navbar: React.FC<props> = ({ difficulty }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  
  const options = [
    { value: 'Normal', label: 'Normal'},
    { value: 'Hard', label: 'Hard'}
  ]

  const resetButtonClick = (): void => {
    window.location.reload();
  }
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  }

  const handleOption = (option: options): void => {
    localStorage.setItem("difficulty", option.value)
    setIsOpen(false);
    window.location.reload();
  }

  return (
    <div className='navbar'>
      <button className='reset-button' onClick={resetButtonClick}>
        <img src={ResetButton} alt="reset button"></img>
      </button>
      <div className='title-bar'>Wordle</div>
      <div className='dropdown-container'>
        <button className='dropdown-button' onClick={toggleDropdown}>{difficulty}</button>
        {isOpen && (
          <ul className='dropdown-menu'>{options.map((option) => (
            <li key={option.value} className='dropdown-menu-option' onClick={() => handleOption(option)}>
              {option.label}
            </li>
          ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Navbar