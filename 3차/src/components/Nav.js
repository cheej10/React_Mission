import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show ? 'nav_black' : ''}`}>
      <img
        className="netflix_logo"
        src="/img/netflix_logo.png"
        alt="netflix logo"
        onClick={() => window.location.reload()}
        width="180"
      />
      <input
        className="nav_input"
        type="text"
        value={searchValue}
        placeholder="영화를 검색해주세요."
        onChange={handleChange}
      />
      <img
        className="netflix_avatar"
        src="/img/netflix_avatar.png"
        alt="netflix avatar"
      />
    </nav>
  );
}
