import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RedirectPage from './RedirectPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortUrl" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
