import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { changePassword, updateUserData } from '../../actions/userActions';

import capitalize from '../../utils/capitalize';

import BreadCrumb from '../common/breadcrumb';
import ProfileTextInput from '../input-group/ProfileTextInput';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            errors: {},
            user: {}
        }
        this.form = React.createRef();
    }

    componentDidMount () {
        const { user } = this.props.user;
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            user: user
        });
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        const { user, errors } = nextProps;
        if (isEmpty(errors)) {
            this.setState({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }, () => {
                this.form.current.reset();
            });
        }

        if (errors) {
            this.setState({
                errors
            });
        }

        if (!isEmpty(user.message)) {
            this.setState({
                user: user.user,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                errors: nextProps.errors
            });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, currentPassword, newPassword, confirmPassword } = this.state;
        const userData = {
            firstName,
            lastName,
            email,
            phone,
            currentPassword : currentPassword ? currentPassword : undefined,
            newPassword,
            confirmPassword
        };

        if (userData.currentPassword === undefined) {
            // update user data
            this.props.updateUserData(userData);
        } else {
            // change password
            this.props.changePassword(userData);
        }
    }

    render () {
        const { firstName, lastName, email, phone, currentPassword, newPassword, confirmPassword, errors } = this.state; 
        return (
            <>
                <Helmet><title>My Zubismart Account | Zubismart.com</title></Helmet>
                <BreadCrumb 
                    title="Account Information"
                    link="profile"
                    linkText="My Profile"
                />
                <div className="dashboard">
                    <section className="left-aside">
                        <div>
                            <h6><span className="mdi mdi-account mdi-24px profile-icon"></span>My Profile</h6>
                            <ul>
                                <li><Link to="/account/profile" style={{ color: '#a7b018', fontWeight: 'bold' }}>Account Information</Link></li>
                                <li><Link to="/account/deliveryAddress">Delivery Address</Link></li>
                            </ul>
                        </div>
                        <div><br/>
                            <h6><span className="mdi mdi-bookmark-check mdi-24px profile-icon"></span>My Orders</h6>
                            <ul>
                                <li><Link to="/account/orders">zubismart.com</Link></li>
                            </ul>
                        </div><br/>
                        <div>
                            <h6><span className="mdi mdi-wallet-outline mdi-24px profile-icon"></span>My Wallet</h6>
                            <ul>
                                <li><Link to="/account/wallet">Wallet</Link></li>
                            </ul>
                        </div>
                    </section>
                    <section className="main-content">
                        <h5>Personal Information</h5>
                        <form ref={this.form} onSubmit={this.handleFormSubmit}>
                            <ProfileTextInput 
                                placeholder1="First name"
                                id1="firstName"
                                name1="firstName"
                                value1={capitalize(firstName)}
                                icon1="mdi mdi-account"
                                errorMessage1={errors.firstName}
                                onChange1={this.onChange}
                        
                                placeholder2="Last name"
                                id2="lastName"
                                name2="lastName"
                                value2={capitalize(lastName)}
                                icon2="mdi mdi-account"
                                errorMessage2={errors.lastName}
                                onChange2={this.onChange}
                            />
    
                            <ProfileTextInput 
                                placeholder1="Email Address"
                                id1="email"
                                name1="email"
                                value1={email}
                                icon1="mdi mdi-email-outline"
                                errorMessage1={errors.email}
                                onChange1={this.onChange}
                            
                                placeholder2="Phone"
                                id2="phone"
                                name2="phone"
                                value2={phone}
                                icon2="mdi mdi-lock-outline"
                                errorMessage2={errors.phone}
                                onChange2={this.onChange}
                            />
    
                            <ProfileTextInput   
                                type1="password"          
                                placeholder1="Current Password"
                                id1="currentPassword"
                                name1="currentPassword"
                                value1={currentPassword}
                                icon1="mdi mdi-lock-outline"
                                errorMessage1={errors.currentPassword}
                                onChange1={this.onChange}
    
                                type2="password"
                                placeholder2="New Password"
                                id2="newPassword"
                                name2="newPassword"
                                value2={newPassword}
                                icon2="mdi mdi-lock-outline"
                                errorMessage2={errors.newPassword}
                                onChange2={this.onChange}
                            />

                            <div className="row">
                                <div className="col s12 input-field">
                                    <span className="mdi mdi-lock-outline prefix"></span>
                                    <input 
                                        className={classnames('form-input validate', {
                                            'invalid': errors.confirmPassword
                                        })}
                                        id={confirmPassword}
                                        name="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        placeholder="Confirm Password"
                                        onChange={this.onChange}
                                    />
                                    {errors.confirmPassword ? (<span className="helper-text invalid-text">{errors.confirmPassword}</span>) : null}
                                </div>
                            </div>
                            <div className="row">
                                <button 
                                    className="save-profile"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors
});

Profile.propTypes = {
    changePassword: PropTypes.func.isRequired,
    updateUserData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { changePassword, updateUserData })(Profile);