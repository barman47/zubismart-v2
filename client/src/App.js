import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LoginAdmin from './components/admin/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import AddBrand from './components/admin/AddBrand';
import Profile from './components/user/Profile';
import Address from './components/user/Address';

import AddProduct from './components/products/AddProduct';
import ViewProduct from './components/products/ViewProduct';
import Overview from './components/products/Overview';

import AddService from './components/services/AddService';

import AdminRoute from './components/common/AdminRoute'; 
import PrivateRoute from './components/common/PrivateRoute'; 

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/userActions';
import { logoutAdmin, setCurrentAdmin } from './actions/adminActions';

if (localStorage.jwtToken) {
	// set auth token to header auth
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

if (localStorage.jwtAdminToken) {
	// set auth token to header auth
	setAuthToken(localStorage.jwtAdminToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtAdminToken);
	// Set user and authenticated
	store.dispatch(setCurrentAdmin(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout out admin
		store.dispatch(logoutAdmin());
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
							<Route exact path="/users/login" component={Login} />
							<Route exact path="/users/register" component={Register} />
							<Route exact path="/admin/login" component={LoginAdmin} />
							<Route exact path="/products/:category/:id" component={ViewProduct} />
							<Route exact path="/cart/overview/" component={Overview} />
							<Switch>
								<AdminRoute path="/admin/products" exact component={AdminDashboard} />
							</Switch>
							<Switch>
								<AdminRoute path="/admin/products/add" exact component={AddProduct} />
							</Switch>
							<Switch>
								<AdminRoute path="/admin/services/add" exact component={AddService} />
							</Switch>
							<Switch>
								<AdminRoute path="/admin/brands/add" exact component={AddBrand} />
							</Switch>
							<Switch>
								<PrivateRoute path="/account/profile" exact component={Profile} />
							</Switch>
							<Switch>
								<PrivateRoute path="/account/deliveryAddress" exact component={Address} />
							</Switch>
							<Footer />
						</Fragment>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}

export default App;