import React, { SetStateAction, useState } from 'react'
import '../App.css'

interface props {
  index: number;
  word: string;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  correctLetters: string[];
}

const Wordbox: React.FC<props> = ({index, guesses, setGuesses, word, correctLetters }) => {
  const [currentGuess, setCurrentGuess] = useState<string[]>([...Array(5)])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let value = e.target.value.toUpperCase()
    if(/^[A-Z]$/.test(value)){
      let newCurrentGuess = [...currentGuess]
      newCurrentGuess[i] = e.target.value
      setCurrentGuess(newCurrentGuess)
    }
  }

  const autoTab = (inputIndex: number, i: number) => {
    document.getElementById(`${inputIndex} ${i}`)?.focus()
  }

  const handleSubmit = () => {
    let currGuess = currentGuess.join()
    if(word === currGuess){
      setWin
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent, i: number) => {

    if(e.key === 'Backspace'){
      let inputNextIndex: number = i - 1 >= 0 ? i - 1 : i
      autoTab(inputNextIndex, index)
    }
    else if(i === 4 && currentGuess[i] !== '' && e.key === 'Enter'){
      handleSubmit()
      autoTab(0, index + 1)
    }
    else{
      let inputNextIndex: number = i < 4 ? i + 1 : i
      autoTab(inputNextIndex, index)
    }
  }

  return (
    <div className='wordbox-container'>
      {currentGuess.map((letter: string, i: number) => (
        <input className='wordbox'
          key={i} 
          type="text" 
          value={currentGuess[i]} 
          id={`${i} ${index}`}
          onChange={(e) => handleChange(e, i)}
          onKeyUp={(e) => handleKeyUp(e, i)}
          />
      ))}
    </div>
  )
}

export default Wordbox