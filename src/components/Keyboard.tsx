import React from 'react'

interface props {
  usedKeys: {[key: string]: string}
}

const Keyboard: React.FC<props> = ({ usedKeys }) => {
  const keyboardrow1: string[] = 'QWERTYUIOP'.split("")
  const keyboardrow2: string[] = 'ASDFGHJKL'.split("")
  const keyboardrow3: string[] = 'ZXCVBNM'.split("")

  const getKeyStyle = (k: string) => {
    return { backgroundColor: usedKeys[k] }
  }

  return (
    <div className='keyboard'>
      <div> 
        {keyboardrow1.map((k: string, index: number) => (
          <span className='kb-1' key={index} style={getKeyStyle(k)}>{k}</span>
        ))}
      </div>
      <div>
        {keyboardrow2.map((k: string, index: number) => (
          <span className='kb-2' key={index} style={getKeyStyle(k)}>{k}</span>
        ))}
      </div>
      <div>
        {keyboardrow3.map((k: string, index: number) => (
          <span className='kb-3' key={index} style={getKeyStyle(k)}>{k}</span>
        ))}
      </div>
    </div>
  )
}

export default Keyboard