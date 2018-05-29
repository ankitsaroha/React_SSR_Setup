import React from 'react';
import { Provider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import routes from './routes/routes';
import App from './components/App/App';

const loadRouteData = (reqPath, store) => {
  const promises = [];
  routes.some((route) => {
    const match = matchPath(reqPath, route);
    if (match) {
      promises.push(route.loadData ? route.loadData(store) : Promise.resolve(null));
    }
    return match;
  });
  return Promise.all(promises);
};

export default (reqPath, store) => (
  loadRouteData(reqPath, store).then(() => {
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();
    const context = {};
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={reqPath} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();

    return `
      <!doctype html>
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
          </script>
          <script src="js/clientbundle.js"></script>
        </body>
      </html>
    `;
  })
);
