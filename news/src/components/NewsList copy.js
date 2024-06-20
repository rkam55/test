import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import styled from 'styled-components';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList2 = ({ category }) => {
  // 받아올 기사들 (아직 비어있기 때문에 null)
  const [articles, setArticles] = useState(null);
  // 로딩중 (아직은 로딩 시작을 안했기 때문에 false)
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    // 데이터를 비동기로 가져오는 hook이 아니라
    // 그냥 렌더링 (mount)할 때 fetchData 객체를 만들어서 이 녀석을 비동기로 실행하겠다.
    // asyn를 사용하는 함수 따로 선언

    const fetchDate = async () => {
      setLoding(true); // 비동기 시작하면서 true로 변경 (로딩중)
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=51319fa6731e49f89b35a4c1a48621a7`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoding(false); // 로딩 끝
    };
    fetchDate();
  }, [category]); // 카테고리가 업데이트 될 때 실행

  // 대기중일 때 (true일 때)
  if (loding) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }

  // articles 값이 아직 설정되지 않았을 때 map 실행X
  // 객체 그대로인 null이라는 값을 알려줘야 한다.
  // map: 순차적으로 반복해서 출력하는 함수
  // 아직 articles 값이 설정되지 않았을 때 map이 실행할 수 있다. => ERROR
  if (!articles) {
    return null;
  }

  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article}></NewsItem>
      ))}
    </NewsListBlock>
  );
};

export default NewsList2;
