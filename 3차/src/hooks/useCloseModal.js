import { useState, useEffect } from 'react';

export const useCloseModal = (compoId) => {
  const [isOutside, setIsOutside] = useState(false);

  useEffect(() => {
    const clickModalOutside = (e) => {
      // 모달 외부 영역 클릭 시
      if (!document.getElementById(compoId)?.contains(e.target)) {
        setIsOutside(true);
      }
    };

    // 이벤트 등록
    window.addEventListener('click', clickModalOutside);

    // 이벤트 제거
    return () => {
      window.removeEventListener('click', clickModalOutside);
    };
  }, []);

  return isOutside;
};
