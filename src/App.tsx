import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import WordGrid from './components/WordGrid';
import Keyboard from './components/Keyboard';

const App = () => {
  const [difficulty, setDifficulty] = useState<string>('Normal');
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [win, setWin] = useState<boolean>()
  
  const fetchData = async (): Promise<string> => {
    try{
      const res = await fetch('https://random-word-api.herokuapp.com/word?length=5')
      const data = res.json()
      console.log(data)
      return data;
    }
    catch(error){
      console.log(error + ' fetching word')
      return 'error'
    }
  }

  const randomWordGenerator = async (): Promise<void> => {
    const word = await fetchData()
    setWord(word)
  }

  useEffect(() => {
    randomWordGenerator();
  }, [difficulty])
  
  useEffect(() => {
    if(win === true){
      alert("Congrats")
      window.location.reload()
    }
    else if(win === false){
      alert("You lose!")
      window.location.reload()
    }
  }, [win])


  return (
    <>
      <Navbar difficulty={difficulty} setDifficulty={setDifficulty} />
      <WordGrid difficulty={difficulty} word={word} guess={guess} setGuess={setGuess} win={win} setWin={setWin}/>
      <Keyboard />
    </>
  )
}

export default App
