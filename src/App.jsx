import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }

  useEffect(() => {
    shuffleCards()
  }, [])


  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prev => prev.map(card => card.src === choiceOne.src ? {...card, matched: true} : card))
        resetTurn() 
      } else {
        setTimeout(() => resetTurn() , 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  
  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic game</h1>
      <button onClick={shuffleCards}>New game</button>
      <ul className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </ul>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
