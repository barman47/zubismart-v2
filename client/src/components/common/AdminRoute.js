import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({ component: Component, admin, ...rest }) => (
    <Route
        {...rest}
        render = {props => admin !== null ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )}
    />
);

AdminRoute.propTypes = {
    admin: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    admin: state.admin
});

export default connect(mapStateToProps)(AdminRoute);