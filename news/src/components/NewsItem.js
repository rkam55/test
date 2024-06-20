import React from 'react';
import styled from 'styled-components';

// div, input, button 등 태그들을 선택할 때 .styled.태그명으로 입력
// (styled-componet에 등록되있는 태그 한정)

const NewsItemBlock = styled.div`
  display: flex;

  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    // 태그와 태그 사이에 margin-top: 3rem
    margin-top: 3rem;
  }
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;

  /* urlToImage && 조건을 단 이유 */
  // 4개중에 화면에 보일 때 완료되는 시점은 urlToImage
  // urlToImage가 용량이 가장 커서 마지막으로 완료됨
  // => 얘를 가져왔으면 나머지 것도 다 가져왔단 뜻!

  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {/* target="_blank" : 새 창으로 불러오기 */}
            {/* rel: noopener, noreferrer*/}
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
