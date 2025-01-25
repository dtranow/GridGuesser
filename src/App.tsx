import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import WordGrid from './components/WordGrid';
import Keyboard from './components/Keyboard';

const App = () => {
  const [difficulty, setDifficulty] = useState<string>('normal');
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  
  return (
    <>
      <Navbar difficulty={difficulty} setDifficulty={setDifficulty} />
      <WordGrid difficulty={difficulty} word={word} guess={guess} setGuess={setGuess}/>
      <Keyboard />
    </>
  )
}

export default App
