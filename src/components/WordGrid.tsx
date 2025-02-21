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

const WordGrid: React.FC<props> = ({ difficulty, word, win, setWin }) => {
  const rows = difficulty === "Normal" ? 6 : 5
  const [guesses, setGuesses] = useState<string[]>([...Array(rows)])
  const [correctLetters, setCorrectLetters] = useState<string[]>([])

  return (
    <div>
      {guesses.map((guess: string, i: number) => (
        <Wordbox index={i} key={i} guesses={guesses} setGuesses={setGuesses} word={word} correctLetters={correctLetters}/>
      ))}
    </div>
  )
}

export default WordGrid