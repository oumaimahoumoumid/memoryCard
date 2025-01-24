import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Game from './components/Game';
import Settings from './components/Settings';
import History from './components/History';

const App = () => {
  const [settings, setSettings] = useState({ cardCount: 4, background: '#ff9800' });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Game cardCount={settings.cardCount} background={settings.background} />} />
        <Route path="/settings" element={<Settings onSettingsChange={setSettings} />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
