import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default App;
