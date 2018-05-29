import Home from '../pages/Home';
import { fetchUsers } from '../actions';

const routes = [
  {
    path: '/home',
    exact: true,
    component: Home,
    loadData: store => (
      Promise.all([store.dispatch(fetchUsers())])
    )
  }
];

module.exports = routes;
