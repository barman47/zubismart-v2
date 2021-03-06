import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render = {props => user.authenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )}
    />
);

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);