import React, { useState } from 'react'
import '../App.css'

interface props {
  index: number;
  word: string;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  setWin: (win: boolean) => void;
  setUsedKeys: ( usedKeys: { [key: string]: string }) => void;
}

const Wordbox: React.FC<props> = ({index, guesses, setGuesses, word, setWin, setUsedKeys }) => {
  const [currentGuess, setCurrentGuess] = useState<string[]>([...Array(5)])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let value = e.target.value.toUpperCase()
    if(/^[A-Z]$/.test(value)){
      let newCurrentGuess = [...currentGuess]
      newCurrentGuess[i] = value
      setCurrentGuess(newCurrentGuess)
    }
    else{
      e.target.value = ""
    }
  }

  const autoTab = (inputIndex: number, i: number) => {
    document.getElementById(`${inputIndex} ${i}`)?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let wordguess: string = currentGuess.join("")
    if(!guesses.includes(wordguess)){
      currentGuess.map((letter: string, i: number) => {
        let input: HTMLElement | null = document.getElementById(`${i} ${index}`)
        let letterElement: HTMLElement | null = document.getElementById(letter)
        if(letter == word[i]){
          if(input) input.style.backgroundColor = "green"
          if(letterElement) letterElement.style.backgroundColor = "green"
          setUsedKeys( {[letter]: "green"} )
        }
        else if(word.includes(letter)){
          if(input) input.style.backgroundColor = "orange"
          if(letterElement) letterElement.style.backgroundColor = "orange"
          setUsedKeys( {[letter]: "orange"} )
        }
        else{
          if(input) input.style.backgroundColor = "gray"
          if(letterElement) letterElement.style.backgroundColor = "gray"
          setUsedKeys( {[letter]: "gray"} )
        }
      })
    }

    let listGuesses = [...guesses]
    listGuesses[index] = wordguess
    setGuesses(listGuesses)
    if(word === wordguess){
      setWin(true)
    }
    else if(index === 5){
      alert("You lose!")
      window.location.reload()
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent, i: number) => {

    if(e.key === 'Backspace'){
      let newCurrentGuess = [...currentGuess]
      newCurrentGuess[i] = ""
      setCurrentGuess(newCurrentGuess)
      let inputNextIndex: number = i - 1 >= 0 ? i - 1 : i;
      autoTab(inputNextIndex, index)
    }
    else if(e.key === 'Enter' && currentGuess.every(letter => letter)){
      handleSubmit(e)
      autoTab(0, index + 1)
    }
    else if(/^[a-zA-Z]$/.test(e.key)){
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