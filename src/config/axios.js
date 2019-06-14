import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000'
    : '/.netlify/functions';

export default axios.create({ baseURL });
