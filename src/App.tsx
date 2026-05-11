import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TitleScreen } from './components/TitleScreen';
import { GameScreen } from './components/game/GameScreen';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </Router>
  );
}
