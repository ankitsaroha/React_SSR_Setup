import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

const Home = () => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1>Home</h1>
    <button onClick={() => { console.log('clicked'); }}>Click Here</button>
  </div>
);

export default Home;
