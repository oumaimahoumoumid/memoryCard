import React from 'react';
import { getGameHistory } from '../utils/storage'; 
import '../styles/History.css'; 

const History = () => {
  const history = getGameHistory();

  const filteredHistory = history.filter(game => game.time !== 0);

  return (
    <div className="history">
      <h2>Game History</h2>
      {filteredHistory.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cards</th>
              <th>Moves</th> 
              <th>Time (s)</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((game, index) => (
              <tr key={index}>
                <td>{game.cards}</td>  
                <td>{game.moves}</td>  
                <td>{game.time}</td>  
                <td>{game.dateTime}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
