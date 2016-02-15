import {createStore, applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import rootReducer from '../reducers/index';


//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const { persistState } = require('redux-devtools')
const DevTools = require('../utils/devTools')
const reduxRouterMiddleware = syncHistory(browserHistory);

let createStoreWithMiddleware;

const middlewares = applyMiddleware(reduxRouterMiddleware,thunkMiddleware);

if(__ENV__ == 'dev'){
	const { persistState } = require('redux-devtools')
	const DevTools = require('../utils/devTools') 
	createStoreWithMiddleware = compose(middlewares,
										DevTools.default.instrument(),
										persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
										)(createStore);
}else{
	createStoreWithMiddleware = middlewares(createStore);
}

export function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
	// Required for replaying actions from devtools to work
	//reduxRouterMiddleware.listenForReplays(store)
    return store;
}