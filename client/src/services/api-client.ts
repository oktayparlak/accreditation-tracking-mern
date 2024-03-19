import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization:
      localStorage.getItem('token') != undefined
        ? `Bearer ${localStorage.getItem('token')}`
        : null,
  },
});
