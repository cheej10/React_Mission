import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'aa53442d7401ccd16c31f8ef0f38abec',
    language: 'ko-KR',
  },
});

export default instance;
