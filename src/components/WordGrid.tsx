import React, { useState } from 'react'
import '../App.css'
import Wordbox from './Wordbox'

type props = {
  difficulty: string;
  word: string;
  guess: string;
  setGuess: (guess:string) => void;
  win: boolean;
  setWin: (win: boolean) => void;
}

const WordGrid: React.FC<props> = ({ difficulty, word, guess, setGuess, win, setWin }) => {
  const rows = difficulty === "Normal" ? 6 : 5
  const [guesses, setGuesses] = useState<string[]>([...Array(rows)])

  return (
    <div>
      {guesses.map((guess: string, i: number) => (
        <Wordbox index={i} key={i} guesses={guesses} setGuesses={setGuesses} word={word}/>
      ))}
    </div>
  )
}

export default WordGrid