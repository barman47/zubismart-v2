import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import capitalize from '../../utils/capitalize';

import BreadCrumb from '../common/breadcrumb';
import ProfileTextInput from '../input-group/ProfileTextInput';

const Profile = (props) => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ errors, setErrors ] = useState({});

    // componentDidMount
    useEffect(() => {
        const { firstName, lastName, email } = props.user.user;

        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
    }, []);

    return (
        <>
            <Helmet><title>My Zubismart Account | Zubismart.com</title></Helmet>
            <BreadCrumb 
                title="Account Information"
                link="My Profile"
            />
            <div className="dashboard">
                <section className="left-aside">
                    <div>
                        <h6><span className="mdi mdi-account mdi-24px profile-icon"></span>My Profile</h6>
                        <ul>
                            <li><Link to="!#" style={{ color: '#a7b018', fontWeight: 'bold' }}>Account Information</Link></li>
                            <li><Link to="!#">Delivery Address</Link></li>
                        </ul>
                    </div>
                    <div><br/>
                        <h6><span className="mdi mdi-bookmark-check mdi-24px profile-icon"></span>My Orders</h6>
                        <ul>
                            <li><Link to="/account/orders">Zubismart.com</Link></li>
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
                    <h5>Account Information</h5>
                    <form action="">
                        <ProfileTextInput 
                            label1="First name"
                            id1="firstName"
                            name1="firstName"
                            value1={capitalize(firstName)}
                            icon1="mdi mdi-account"
                            errorMessage1={errors.firstName}
                            onChange1={(e) => setFirstName(e.target.value)}
                    
                            label2="Last name"
                            id2="lastName"
                            name2="lastName"
                            value2={capitalize(lastName)}
                            icon2="mdi mdi-account"
                            errorMessage2={errors.lastName}
                            onChange2={(e) => setLastName(e.target.value)}
                        />

                        <ProfileTextInput 
                            label1="Email Address"
                            id1="email"
                            name1="email"
                            value1={email}
                            icon1="mdi mdi-email-outline"
                            errorMessage1={errors.email}
                            onChange1={(e) => setEmail(e.target.value)}
                        
                            label2="Current Password"
                            id2="password"
                            name2="password"
                            value2={password}
                            icon2="mdi mdi-lock-outline"
                            errorMessage2={errors.password}
                            onChange2={(e) => setPassword(e.target.value)}
                        />

                        <ProfileTextInput 
                            label1="Current Password"
                            id1="currentPassword"
                            name1="currentPassword"
                            value1={currentPassword}
                            icon1="mdi mdi-lock-outline"
                            errorMessage1={errors.currentPassword}
                            onChange1={(e) => setCurrentPassword(e.target.value)}
                        
                            label2="Confirm Password"
                            id2="newPassword"
                            name2="newPassword"
                            value2={newPassword}
                            icon2="mdi mdi-lock-outline"
                            errorMessage2={errors.newPassword}
                            onChange2={(e) => setNewPassword(e.target.value)}
                        />

                        <div className="row">
                            <button 
                                className="save-profile"
                                onClick={() => alert('You no see as I dey look you?')}
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Profile);