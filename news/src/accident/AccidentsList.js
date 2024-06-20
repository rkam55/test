import axios from 'axios';
import { List } from 'react-virtualized';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AccidentItem from './AccidentItem';

const AccidentsList = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [accidents, setAccidents] = useState(null);

  // useCallback을 조건부 밖으로 이동
  const renderer = useCallback(
    ({ index, key, style }) => {
      const accident = accidents[index];
      return <AccidentItem key={key} style={style} accident={accident} />;
    },
    [accidents]
  );

  // 왜이렇게 되는지 체크
  const fetchAccidents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://openapi.gg.go.kr/TfcacdarM?KEY=fc76fc7bb9be43b4b5a9bdfd41f63e39&TYPE=json&pIndex=1&pSize=1000'
      );
      const allAccidents = response.data.TfcacdarM[1].row;
      if (category === 'all') {
        setAccidents(allAccidents);
      } else {
        const categoryFilter = allAccidents.filter(
          (accident) => accident.ACDNT_DIV_NM === category
        );
        setAccidents(categoryFilter);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchAccidents();
  }, [fetchAccidents]);

  const rowCount = useMemo(
    () => (accidents ? accidents.length : 0),
    [accidents]
  );
  /*
  1. fetchAccidents 함수를 useCallback 훅으로 감싸서 컴포넌트가 리렌더링될 때마다 새로운 함수가 생성되는 것을 방지합니다.
  2. 데이터를 가져오는 API 호출은 컴포넌트가 마운트될 때 한 번만 이루어지도록 useEffect 훅을 사용합니다.
  3. useMemo 훅을 사용하여 rowCount를 계산하여 불필요한 렌더링을 줄입니다.
  */

  if (loading) {
    return <div>대기중</div>;
  }

  if (!accidents) {
    return null;
  }

  return (
    <div className="list">
      {/* {accidents &&
        accidents.map((accident) => (
          <AccidentItem key={accident.SPOT_NO} accident={accident} />
        ))} */}
      <List
        width={300}
        height={585}
        rowCount={rowCount}
        rowHeight={117}
        rowRenderer={renderer}
        List={accidents}
        style={{ outLine: 'none' }}
      ></List>
    </div>
  );
};

export default React.memo(AccidentsList);
