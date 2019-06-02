import { createStore } from 'redux';

import reducers from './ducks';

// Import reducers right here
const store = createStore(reducers);

export default store;
