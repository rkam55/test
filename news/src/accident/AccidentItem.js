import React from 'react';

const AccidentItem = ({ accident, style }) => {
  const { SIGUN_NM, ACDNT_DIV_NM, ACDNT_YY } = accident;
  //const location = { LAT, LOGT };

  return (
    <div style={style} className="item">
      <p>사고유형 : {ACDNT_DIV_NM}</p>
      <p>행정자치별 : {SIGUN_NM}</p>
      <p>년도 : {ACDNT_YY}</p>
    </div>
  );
};

export default AccidentItem;
