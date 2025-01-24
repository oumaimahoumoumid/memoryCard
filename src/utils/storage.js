
export const saveGameToHistory = (gameData) => {
  const history = JSON.parse(localStorage.getItem('gameHistory')) || [];
  history.push(gameData); 
  localStorage.setItem('gameHistory', JSON.stringify(history));
};

export const getGameHistory = () => {
  return JSON.parse(localStorage.getItem('gameHistory')) || [];
};
