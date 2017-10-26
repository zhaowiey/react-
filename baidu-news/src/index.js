import React from 'react';

import ReactDOM from 'react-dom';

import App from './js/components/app.js';

import Profile from './js/components/profile.js';

import SearchPage from './js/components/searchpage.js';

import Manage from './js/components/manage.js';

import SubscribeManage from './js/components/subscribe_manage.js';

import SubscribeSearch from './js/components/subscribe_search.js';

import Login from './js/components/login.js';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

ReactDOM.render(
	
	<Router>

		<div>

			<Route exact path="/" component={App}/>

			<Route path="/profile" component={Profile}/>

			<Route path="/searchpage" component={SearchPage}/>

			<Route path="/manage" component={Manage}/>

			<Route path="/subscribe/manage" component={SubscribeManage}/>

			<Route path="/subscribe/search" component={SubscribeSearch}/>

			<Route path="/login" component={Login}/>

		</div>
		
	</Router>
	
	, document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}