import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/userActions';

import TextInput from '../input-group/TextInput';

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
        setErrors(props.errors);
    }, [props.errors]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            phone,
            password
        };

        props.registerUser(user, props.history);
    };

    return (
        <>
            <Helmet><title>Register User | Zubismart.com</title></Helmet>
            <div className="register">
                <form onSubmit={handleFormSubmit} className="register-form">
                    <h3>Create An Account</h3>
                    <TextInput
                        label="Enter First Name"
                        icon="mdi mdi-account"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        errorMessage={errors.firstName}
                    />
                    <TextInput
                        label="Enter Last Name"
                        icon="mdi mdi-account"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        errorMessage={errors.lastName}
                    />
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
                        label="Enter Phone Number"
                        icon="mdi mdi-cellphone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        errorMessage={errors.phone}
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
                        <button type="submit">Create Account</button>
                    </div>
                    <p>By Signing up you agree to our <Link to="/terms">terms and conditions</Link></p>
                    <div className="col s12">
                        <p>Already have an account?</p>
                        <button onClick={() => props.history.push('/users/login')} className="login">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.user
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));