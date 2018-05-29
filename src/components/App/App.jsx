import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import routes from '../../routes/routes';
import './style.css';

const App = () => (
  <div>
    <Helmet>
      <title>BitAzu</title>
    </Helmet>
    <h1>CRYPTO</h1>
    <Link to="/home">Home</Link>
    <Switch>
      {
        routes.map((route, i) => {
          const key = i;
          return (
            <Route key={key} {...route} />
          );
        })
      }
    </Switch>
  </div>
);

export default App;
