import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import '../App.css'

interface props {
  index: number;
  word: string;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  setWin: (win: boolean) => void;
  usedKeys: { [key: string]: string };
  setUsedKeys: ( usedKeys: { [key: string]: string }) => void;
  rows: number;
}

const Wordbox: React.FC<props> = ({index, guesses, setGuesses, word, setWin, usedKeys, setUsedKeys, rows }) => {
  const [currentGuess, setCurrentGuess] = useState<string[]>([...Array(5).fill("")])
  const [shake, setShake] = useState<boolean>(false)
  const [winEffect, setWinEffect] = useState<boolean>(false)
  
  useEffect(() => {
    document.getElementById(`0 0`)?.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let value = e.target.value.toUpperCase()
    if(/^[A-Z]$/.test(value)){
      let newCurrentGuess = [...currentGuess]
      newCurrentGuess[i] = value
      setCurrentGuess(newCurrentGuess)
      autoTab(i + 1, index)
    }
  }

  const autoTab = (inputIndex: number, i: number) => {
    document.getElementById(`${inputIndex} ${i}`)?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let wordguess: string = currentGuess.join("")
    if(!guesses.includes(wordguess)){
      let currUsedKeys = { ...usedKeys }
      let wordLetterCount: { [key: string]: number } = {}
      for(let letter of word){
        wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1
      }

      let markedLetters: boolean[] = new Array(5).fill(false)

      currentGuess.forEach((letter: string, i: number) => {
        let input: HTMLElement | null = document.getElementById(`${i} ${index}`)
        let letterElement: HTMLElement | null = document.getElementById(letter)
        if(letter === word[i]){
          if(input) input.style.backgroundColor = "green"
          if(letterElement) letterElement.style.backgroundColor = "green"
          wordLetterCount[letter]--;
          markedLetters[i] = true
          currUsedKeys[letter] = "green";
        }
      })

      currentGuess.forEach((letter: string, i: number) => {
        let input: HTMLElement | null = document.getElementById(`${i} ${index}`)
        let letterElement: HTMLElement | null = document.getElementById(letter)
        if(word.includes(letter) && !markedLetters[i] && wordLetterCount[letter] > 0){
          if(input) input.style.backgroundColor = "orange"
          if(letterElement) letterElement.style.backgroundColor = "orange"
          wordLetterCount[letter]--;
          markedLetters[i] = true
        }
        else if(!markedLetters[i]){
          if(input) input.style.backgroundColor = "gray"
          if(letterElement) letterElement.style.backgroundColor = "gray"
        }
        if(word.includes(letter) && usedKeys[letter] !== "green"){
          currUsedKeys[letter] = currUsedKeys[letter] === "green" ? "green" : "orange";
        }
        else if(usedKeys[letter] !== "green" && usedKeys[letter] !== "orange"){
          currUsedKeys[letter] = "gray";
        }
      })
      setUsedKeys(currUsedKeys)
    }
    let listGuesses = [...guesses]
    listGuesses[index] = wordguess
    setGuesses(listGuesses)
    if(word !== wordguess){
      setShake(true)
      setTimeout(() =>
        setShake(false), 500)
    }
    if(word === wordguess){
      setWin(true)
      setWinEffect(true)
      confetti({
        particleCount: 200,
        spread: 120,
        origin:{y: 0.4}
      })
    }
    else if(index === rows - 1){
      setTimeout(() => {
        alert(`You lose! The word is ${word}`);
        window.location.reload();
      }, 500)
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
  }

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if(currentGuess[i] !== "" && /^[a-zA-Z]$/.test(e.key)){
      let newCurrentGuess = [...currentGuess]
      newCurrentGuess[i] = ""
      setCurrentGuess(newCurrentGuess)
    }
  }

  return (
    <div className={`wordbox-container ${shake? "shake" : ""} ${winEffect ? "win-animation" : ""}`}>
      {currentGuess.map((letter: string, i: number) => (
        <input className='wordbox'
          key={i} 
          type="text" 
          value={letter} 
          id={`${i} ${index}`}
          onChange={(e) => handleChange(e, i)}
          onKeyUp={(e) => handleKeyUp(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          />
      ))}
    </div>
  )
}

export default Wordbox