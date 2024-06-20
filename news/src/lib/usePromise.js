import { useEffect, useState } from 'react';

export default function usePromise(promiseCreator, deps) {
  const [loding, setLoding] = useState(false);
  const [resolved, setResolved] = useState(null); // 로딩 성공
  const [error, setError] = useState(null); // 로딩 실패

  useEffect(() => {
    const process = async () => {
      // 비동기 처리
      setLoding(true); // 로딩중
      try {
        const resolved = await promiseCreator();
        // promiseCreator() 실행 (파라미터로 받은 데이터)
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoding(false); // 로딩X
    };
    process();
  }, deps); // deps 업데이트 시 위 함수{} 내용 실행

  return [loding, resolved, error];
  // resolved 성공했을 때 promiseCreator()
}
