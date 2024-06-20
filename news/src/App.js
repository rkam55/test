import Home from './accident/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Home />} />
    </Routes>
  );
};

export default App;
