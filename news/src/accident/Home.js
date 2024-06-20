import React from 'react';
import Categories from './Categories';
import Search from './Search';
import AccidentsList from './AccidentsList';
import Map from './Map';
import './Accident.scss';
import { useParams } from 'react-router-dom';

const Home = () => {
  const params = useParams();
  const category = params.category || 'all';
  // categoryFilter 함수는.. 카테고리 클릭 시 발생해야함

  return (
    <div className="myApp">
      <header>경기도 사고 유형별 위치 조회</header>
      <Categories category={category} />
      <div style={{ display: 'flex' }}>
        <div className="search-list-box">
          <Search />
          <AccidentsList category={category} />
        </div>
        <Map />
      </div>
    </div>
  );
};

export default Home;
