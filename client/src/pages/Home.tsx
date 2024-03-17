import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem('token') === null) {
  //     navigate('/login');
  //   }
  // }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
