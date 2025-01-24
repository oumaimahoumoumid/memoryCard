import React, { useState } from 'react';
import '../styles/Setting.css';

const Settings = ({ onSettingsChange }) => {
  const [cardCount, setCardCount] = useState(4);
  const [background, setBackground] = useState('#ff9800');

  const handleSettingsChange = () => {
    onSettingsChange({ cardCount, background });
    alert('Settings have been saved successfully!');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      
      <div className="setting-item">
        <label>Number of cards:</label>
        <select
          value={cardCount}
          onChange={(e) => setCardCount(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
        </select>
      </div>

      <div className="setting-item">
        <label>Background color:</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="color-picker"
          style={{ backgroundColor: background }}
        />
      </div>

      <button onClick={handleSettingsChange}>Save</button>
    </div>
  );
};

export default Settings;
