import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is-empty';

const AdminRoute = ({ component: Component, admin, ...rest }) => (
    <Route
        {...rest}
        render = {props => !isEmpty(admin) ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )}
    />
);

AdminRoute.propTypes = {
    admin: PropTypes.object
};

const mapStateToProps = (state) => ({
    admin: state.admin
});

export default connect(mapStateToProps)(AdminRoute);