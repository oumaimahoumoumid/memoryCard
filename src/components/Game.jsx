import React, { useState, useEffect } from 'react';
import { saveGameToHistory } from '../utils/storage';
import '../styles/Game.css';

const Game = ({ cardCount, background }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);  
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [allCardsFlipped, setAllCardsFlipped] = useState(false);

  const cardIcons = [
    '🍎', '🍌', '🍒', '🍉', '🍇', '🍍', '🍓', '🍊',
    '🍑', '🍋', '🍒', '🍍', '🍓', '🍉', '🍊', '🍋'
  ];

  const shuffleCards = () => {
    const shuffled = [
      ...cardIcons.slice(0, cardCount / 2),
      ...cardIcons.slice(0, cardCount / 2),
    ]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, flipped: false }));

    setCards(shuffled);
    setMatchedCards([]);
    setFlippedCards([]);
    setMoves(0);  
    setTime(0);
    setIsGameStarted(true);
    setTimerRunning(false);
    setAllCardsFlipped(false);
  };

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerRunning]);

  useEffect(() => {
    shuffleCards();
  }, [cardCount]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || cards[index].flipped) return;

    const newFlippedCards = [...flippedCards, index];
    const newCards = [...cards];
    newCards[index].flipped = true;

    setFlippedCards(newFlippedCards);
    setCards(newCards);

    setMoves((prevMoves) => prevMoves + 1);

    if (!timerRunning) {
      setTimerRunning(true);
    }

    if (newFlippedCards.length === 1) {
      return;
    }

    const [firstCardIndex, secondCardIndex] = newFlippedCards;

    if (cards[firstCardIndex].icon === cards[secondCardIndex].icon) {
      setMatchedCards((prevMatched) => [...prevMatched, cards[firstCardIndex].icon]);
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        newCards[firstCardIndex].flipped = false;
        newCards[secondCardIndex].flipped = false;
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  const checkGameCompletion = () => {
    const allCardsFlipped = cards.every((card) => card.flipped);
    setAllCardsFlipped(allCardsFlipped);

    if (allCardsFlipped) {
      setTimerRunning(false);
    }
  };

  useEffect(() => {
    checkGameCompletion();
  }, [cards]);

  useEffect(() => {
    if (allCardsFlipped) {
      const gameData = {
        cards: cards.length,
        time,
        moves,  
        dateTime: new Date().toLocaleString(),
      };
      saveGameToHistory(gameData);  
      if (matchedCards.length === cards.length / 2) {
        setTimeout(() => alert('Congratulations! You have won the game! 🎉'), 500);
      }
    }
  }, [allCardsFlipped]);

  return (
    <div className="game-container" style={{ backgroundColor: background }}>
      <h1>Memory Game</h1>
      <div className="game-info">
        <button onClick={() => shuffleCards()} className="start-button">
          {isGameStarted ? 'Restart' : 'Start'}
        </button>
        <div className="game-stats">
          <p>Moves: {moves}</p>
          <p>Time: {time}s</p>
        </div>
      </div>
      <div className="card-grid" style={{ gridTemplateColumns: `repeat(${Math.sqrt(cardCount)}, 1fr)` }}>
        {cards.map((card, index) => (
          <div key={card.id} className={`card ${card.flipped ? 'flipped' : ''}`} onClick={() => handleCardClick(index)}>
            <div className="card-front">{card.icon}</div>
            <div className="card-back">?</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
