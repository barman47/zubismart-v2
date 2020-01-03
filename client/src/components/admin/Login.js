import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginAdmin } from '../../actions/adminActions';

import TextInput from '../input-group/TextInput';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // componentDidMount
    useEffect(() => {
        if (props.user.user) {
            props.history.push('/');
        }

        if (props.admin) {
            props.history.push('/');
        }
    }, []);

    // componentDidUpdate
    useEffect(() => {
        const { errors, history, admin } = props;
        if (errors) {
            setErrors(props.errors);
        }

        if (admin) {
            history.push('/admin/dashboard');
        }
    }, [props]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const admin = {
            email,
            password
        };

        props.loginAdmin(admin);
    };

    return (
        <>
            <Helmet><title>Admin Login | Zubismart.com</title></Helmet>
            <div className="login">
                <form onSubmit={handleFormSubmit} className="login-form" noValidate>
                    <h3>Admin Login</h3>
                    <TextInput
                        type="email"
                        label="Enter Admin Email"
                        icon="mdi mdi-account-outline"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        errorMessage={errors.email}
                    />
                    <TextInput
                        type="password"
                        label="Enter Password"
                        icon="mdi mdi-lock-outline"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        errorMessage={errors.password}
                    />
                    <div className="col s12 input-field">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

Login.propTypes = {
    loginAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    admin: state.admin,
    user: state.user
});

export default connect(mapStateToProps, { loginAdmin })(Login);