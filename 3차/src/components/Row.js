import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal/index';
import { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <Swiper
          modules={[Navigation, Scrollbar]}
          navigation // 화살표 네비게이션
          spaceBetween={20} // margin 값
          slidesPerView={6} // 한번에 보여지는 slide 개수
        >
          <div id={id} className="row_posters">
            {movies.map((movie) => (
              // 요소 하나하나가 slide, 키값 필요
              <SwiperSlide key={movie.id}>
                <img
                  className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  } `}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        {modalOpen && (
          <MovieModal
            {...movieSelected}
            setModalOpen={setModalOpen}
          ></MovieModal>
        )}
      </div>
    </section>
  );
}
