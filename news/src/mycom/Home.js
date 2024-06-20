import React from 'react';
import NewsList from '../mycom/NewsList';
import Categories from '../mycom/Categories';
import { useParams } from 'react-router-dom';

const Home = () => {
  const params = useParams();
  const category = params.category || 'all';

  return (
    <div>
      <Categories />
      <NewsList category={category} />
    </div>
  );
};

export default Home;
