import React, { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      // 컴포넌트 사용 안할 때 리스너 제거
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show ? 'nav_black' : ''}`}>
      <img
        className="netflix_logo"
        src="/img/netflix_logo.png"
        alt="netflix logo"
        onClick={() => window.location.reload()}
        width="180"
      />
      <img
        className="netflix_avatar"
        src="/img/netflix_avatar.png"
        alt="netflix avatar"
      />
    </nav>
  );
}
