import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './mycom/NewsPage';

const MyApp = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<newsPage />} />
    </Routes>
  );
};

export default MyApp;
