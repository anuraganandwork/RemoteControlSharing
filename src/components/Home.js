import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Join as:</h1>
      <div>
        <Link to="/teacher">Join as Teacher</Link>
      </div>
      <div>
        <Link to="/student">Join as Student</Link>
      </div>
    </div>
  );
};

export default Home;
