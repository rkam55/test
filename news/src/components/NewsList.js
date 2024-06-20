import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import usePromise from '../lib/usePromise';

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

const NewsList = ({ category }) => {
  const [loding, response, error] = usePromise(() => {
    // usePromise 에 들어있는 함수가 초기값
    // usePromise에서 리턴된 [loding, resolved, error]에서
    // 동일한 위치로 전달해주는 것
    // 응답받은 결과: response
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=51319fa6731e49f89b35a4c1a48621a7`
    );
    // category 업데이트되면 {} 내용을 다시 읽어들여라
  }, [category]);

  // 대기중일 때 (true일 때)
  if (loding) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }

  if (!response) {
    return null;
  }

  // 에러인 경우
  if (error) {
    return <NewsListBlock>ERROR!</NewsListBlock>;
  }

  // response 값이 유효할 때:
  // response의 데이터가 있으면 articles로 변수명을 사용하겠다.
  const { articles } = response.data;

  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article}></NewsItem>
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
