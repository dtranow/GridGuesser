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

const Navbar: React.FC<props> = ({ difficulty, setDifficulty }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  
  const options = [
    { value: 'normal', label: 'Normal'},
    { value: 'hard', label: 'Hard'}
  ]

  const resetButtonClick = (): void => {

  }
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  }

  const handleOption = (option: options): void => {
    setIsOpen(false);
    setDifficulty(option.value);
  }

  return (
    <div className='navbar'>
      <button className='reset-button' onClick={resetButtonClick}>
        <img src={ResetButton} alt="reset button"></img>
      </button>
      <div>
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