import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Register from './components/users/Register';

// import PrivateRoute from './components/common/PrivateRoute'; 

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/userActions';

if (localStorage.jwtToken) {
	// set auth tokwn to header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and authenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout out user
		store.dispatch(logoutUser());
		window.location.href = '/';
	}
}

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router>
					<ScrollToTop>
						<Fragment>
							<Header />
							<Route exact path="/" component={Home} />
							<Route exact path="/account/register" component={Register} />
							{/* <Switch>
								<PrivateRoute path="/dashboard" exact component={Dashboard} />
							</Switch> */}

							<Footer />
						</Fragment>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}

export default App;