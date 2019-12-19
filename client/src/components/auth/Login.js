import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/userActions';

import TextInput from '../input-group/TextInput';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // componentDidUpdate
    useEffect(() => {
        const { errors, history, user } = props;
        if (errors) {
            setErrors(props.errors);
        }

        if (user.user) {
            history.push('/');
        }
    }, [props]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        };

        props.loginUser(user, props.history);
    };

    return (
        <>
            <Helmet><title>User Login | Zubismart.com</title></Helmet>
            <div className="login">
                <form onSubmit={handleFormSubmit} className="login-form" noValidate>
                    <h3>User Login</h3>
                    <TextInput
                        type="email"
                        label="Enter Email Address"
                        icon="mdi mdi-email-outline"
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
                    <div className="col s12">
                        <p>Don't have an account?</p>
                        <button onClick={() => props.history.push('/users/register')} className="login">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.user
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));