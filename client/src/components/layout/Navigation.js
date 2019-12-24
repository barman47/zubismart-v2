import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import PropTypes from 'prop-types';

import logo from '../../assets/img/logo.jpg';

import isEmpty from '../../validation/is-empty';
import capitalize from '../../utils/capitalize';

import { logoutUser } from '../../actions/userActions';

class Navigation extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: null,
            showDropdown: false
        };
    }

    componentDidMount () {
        this.setState({ 
            user: this.props.user.user ,
            showDropdown: false
        });
        const elems = document.querySelectorAll('.sidenav');
        //eslint-disable-next-line
        const instances = M.Sidenav.init(elems, {});
        
        const elems2 = document.querySelectorAll('.dropdown-trigger');
        //eslint-disable-next-line
        const instances2 = M.Dropdown.init(elems2, {});
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if(isEmpty(nextProps.user.user)) {
            this.setState({ user: null });
            M.toast({
                html: 'User logged out Successfully',
                classes: 'toast-valid'
            });
        } else {
            this.setState({ user: nextProps.user.user });
        }
    }

    showMyAccountDropdown = () => {
        this.setState({ showDropdown: true })
    };

    hideDropdown = () => this.setState({ showDropdown: false });

    onLogoutClick = () => {
        this.props.logoutUser();
        this.setState({ showDropdown: false });
    }

    render () {
        const { showDropdown, user } = this.state;
        const guestHeader = (
            <>
                <Link to="/users/login" className="grid-item">Login</Link>
            </>
        );
    
        const userHeader = (
            <>
                <Link to="/!#" className="grid-item" onMouseOver={this.showMyAccountDropdown}>
                    <span className="mdi mdi-chevron-down right"></span>
                    My Account
                </Link>
                {showDropdown ? (
                    <ul onMouseLeave={this.hideDropdown} className="account-dropdown">
                        <li className="greeting">{user && (`Hi, ${capitalize(user.firstName)} !`)}</li>
                        <li className="divider"></li>
                        <li><Link to="/account/profile"><span className="mdi mdi-account-outline dropdown-icon"></span>My Profile</Link></li>
                        <li><Link to="/account/orders"><span className="mdi mdi-bookmark-check dropdown-icon"></span>My Orders</Link></li>
                        <li><Link to="/account/favourites"><span className="mdi mdi-heart-outline dropdown-icon"></span>My Saved Items</Link></li>
                        <li><Link to="/account/wallet"><span className="mdi mdi-wallet-outline dropdown-icon"></span>My Wallet</Link></li>
                        <li className="divider"></li>
                        <li><button className="logout-button" onClick={this.onLogoutClick} href="#"><span className="mdi mdi-logout dropdown-icon"></span>Logout</button></li>
                    </ul>
                ) : null }
            </>
        );

        return (
            <>
                <section className="header-section">
                    <div>
                        <Link to="#" className="sidenav-trigger" data-target="mobile-menu"><span className="mdi mdi-menu mdi-24px menu-icon"></span></Link>
                        <Link className="brand-logo" to="/">
                            <img src={logo} alt="Zubismart Logo" className="logo" />
                        </Link>
                        <input className="grid-item" type="search" placeholder="Looking for something? Search here..." />
                        <button className="grid-item" type="submit"><span className="mdi mdi-magnify mdi-24px search-icon"></span></button>
                    </div>
                    <div>
                        {user ? userHeader : guestHeader}
                        <Link to="/cart" className="grid-item"><span style={{ marginRight: '5px' }} className="mdi mdi-cart-outline mdi-12px left"></span>My Cart <span className="cart">0</span></Link>
                    </div>
                </section>
                <nav>
                    <div className="nav-wrapper">
                        <ul className="hide-on-med-and-down">
                            <li><Link to="">Fashion</Link></li>
                            <li><Link to="">Gadgets</Link></li>
                            <li><Link to="">Cosmetics</Link></li>
                            <li><Link to="">Home/Office</Link></li>
                            <li><Link to="">Groceries</Link></li>
                            <li><Link to="">Babies</Link></li>
                            <li><Link to="">Books</Link></li>
                            <li><Link to="">Events</Link></li>
                            <li><Link to="">Others</Link></li>
                            <li><Link to="">Services</Link></li>
                        </ul>
                    </div>
                </nav>
                <ul id="mobile-menu" className="sidenav">
                    <li><Link to="/">Home</Link></li>
                    <li className="divider"></li>
                    <li><Link to="">Fashion</Link></li>
                    <li><Link to="">Gadgets</Link></li>
                    <li><Link to="">Cosmetics</Link></li>
                    <li><Link to="">Home/Office</Link></li>
                    <li><Link to="">Groceries</Link></li>
                    <li><Link to="">Babies</Link></li>
                    <li><Link to="">Books</Link></li>
                    <li><Link to="">Events</Link></li>
                    <li><Link to="">Others</Link></li>
                    <li><Link to="">Services</Link></li>
                </ul>
            </>
        );
    }
};

Navigation.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { logoutUser })(Navigation);