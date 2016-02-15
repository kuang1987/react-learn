import 'babel-polyfill';
//import 'fastclick';
//import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import {configureStore,reduxRouterMiddleware} from './store/configureStore';

console.log(Provider);

const store = configureStore();


function renderDevTools(store){
	if(__ENV__ == 'dev'){
		console.log(__ENV__);
		const DevTools = require('./utils/devTools').default;
		return (<DevTools store={store}/>);
	}
}

ReactDOM.render(
	<div>
		<Provider store={store}>
			<App />
    	</Provider>
    	{renderDevTools(store)}
    </div>,
    document.getElementById('main')
);
