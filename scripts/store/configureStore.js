import {createStore, applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';


//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const { persistState } = require('redux-devtools')
const DevTools = require('../utils/devTools')

let createStoreWithMiddleware;

if(__ENV__ == 'dev'){
	const { persistState } = require('redux-devtools')
	const DevTools = require('../utils/devTools') 
	createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware),
										DevTools.default.instrument(),
										persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
										)(createStore);
}else{
	createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
}
