import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import store from './store';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';
import './styles.css';

toast.configure({
  autoClose: 5000,
});

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Routes />
    </Fragment>
  </Provider>
);

export default App;
