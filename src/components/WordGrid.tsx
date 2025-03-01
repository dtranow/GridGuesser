import React, { useEffect, useState } from "react";
import "../App.css";
import Wordbox from "./Wordbox";

type props = {
  difficulty: string;
  word: string;
  setWin: (win: boolean) => void;
  usedKeys: { [key: string]: string };
  setUsedKeys: (usedKeys: { [key: string]: string }) => void;
};

const WordGrid: React.FC<props> = ({
  difficulty,
  word,
  setWin,
  usedKeys,
  setUsedKeys,
}) => {
  const rows = difficulty === "Normal" ? 6 : 5;
  const [guesses, setGuesses] = useState<string[]>([...Array(rows).fill("")]);

  useEffect(() => {
    setGuesses([...Array(rows)]);
  }, [rows]);

  return (
    <div>
      {guesses.map((_, i: number) => (
        <Wordbox
          index={i}
          key={i}
          guesses={guesses}
          setGuesses={setGuesses}
          word={word}
          setWin={setWin}
          usedKeys={usedKeys}
          setUsedKeys={setUsedKeys}
          rows={rows}
        />
      ))}
    </div>
  );
};

export default WordGrid;
