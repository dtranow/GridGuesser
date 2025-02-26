import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import WordGrid from './components/WordGrid';
import Keyboard from './components/Keyboard';

const App = () => {
  const [difficulty, setDifficulty] = useState<string>('Normal');
  const [word, setWord] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [win, setWin] = useState<boolean>(false)
  const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({})
  
  const fetchData = async (): Promise<string> => {
    try{
      const res = await fetch('https://random-word-api.herokuapp.com/word?length=5')
      const data = await res.json()
      console.log(data)
      return data[0];
    }
    catch(error){
      console.log(error + ' fetching word')
      return 'error'
    }
  }

  const randomWordGenerator = async (): Promise<void> => {
    const word = await fetchData()
    let upperWord = word.toUpperCase()
    setWord(upperWord)
  }

  useEffect(() => {
    randomWordGenerator();
    console.log(word)
  }, [difficulty])
  
  useEffect(() => {
    if(win === true){
      alert("Congrats")
      window.location.reload()
    }
  }, [win])


  return (
    <>
      <Navbar difficulty={difficulty} setDifficulty={setDifficulty} />
      <WordGrid difficulty={difficulty} word={word} guess={guess} setGuess={setGuess} win={win} setWin={setWin} setUsedKeys={setUsedKeys} />
      <Keyboard usedKeys={usedKeys}/>
    </>
  )
}

export default App
