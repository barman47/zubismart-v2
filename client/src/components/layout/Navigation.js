import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';
import PropTypes from 'prop-types';

import logo from '../../assets/img/logo.png';

import isEmpty from '../../validation/is-empty';
import capitalize from '../../utils/capitalize';
import firstName from '../../utils/firstName';

import { logoutAdmin } from '../../actions/adminActions';
import { logoutUser } from '../../actions/userActions';

class Navigation extends Component {
    constructor (props) {
        super(props);
        this.state = {
            admin: null,
            user: this.props.user.user,
            cart: {
                products: []
            },
            showDropdown: false
        };
    }

    componentDidMount () {
        this.setState({ 
            admin: this.props.admin,
            // user: this.props.user.user,
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
        const { admin, user, cart } = nextProps;
        
        if(user.authenticated === false) {
            this.setState({ user: {} });
        } else {
            this.setState({ user: user.user });
        }

        if (isEmpty(admin)) {
            this.setState({ admin: null });
        } else {
            this.setState({ admin });
        }
        
        try {
            if (cart.products.length !== this.state.cart.products.length) {
                this.setState({ cart });
            }
        } catch (err) {

        }

        if (isEmpty(nextProps.cart)) {
            this.setState({
                cart: {
                    products: []
                }
            });
        }
    }

    showMyAccountDropdown = () => {
        this.setState({ showDropdown: true })
    };

    hideDropdown = () => this.setState({ showDropdown: false });

    onLogoutClick = (useCase) => {
        switch (useCase) {
            case 'admin':
                this.props.logoutAdmin();
                this.setState({ showDropdown: false });
                break;
            
            case 'user':
                this.props.logoutUser(this.props.history);
                this.setState({ showDropdown: false });
                break;

            default:
                break;
        }
    }

    render () {
        const { cart, showDropdown, user, admin } = this.state;
        let header = null;

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
                        <li><button className="logout-button" onClick={(e) => this.onLogoutClick('user')} href="#"><span className="mdi mdi-logout dropdown-icon"></span>Logout</button></li>
                    </ul>
                ) : null }
            </>
        );
    
        const adminHeader = (
            <>
                <Link to="/!#" className="grid-item" onMouseOver={this.showMyAccountDropdown}>
                    <span className="mdi mdi-chevron-down right"></span>
                    Admin
                </Link>
                {showDropdown ? (
                    <ul onMouseLeave={this.hideDropdown} className="account-dropdown">
                        <li className="greeting">{admin && (`Hi, ${firstName(admin.name)} !`)}</li>
                        <li className="divider"></li>
                        <li><Link to="/admin/products"><span className="mdi mdi-view-dashboard dropdown-icon"></span>Dashboard</Link></li>
                        <li><Link to="/admin/products/orders"><span className="mdi mdi-bookmark-check dropdown-icon"></span>Orders</Link></li>
                        <li><Link to="/admin/users/all"><span className="mdi mdi-account-group-outline dropdown-icon"></span>Users</Link></li>
                        <li><Link to="/admin/profile"><span className="mdi mdi-account-outline dropdown-icon"></span>Profile</Link></li>
                        <li className="divider"></li>
                        <li><button className="logout-button" onClick={() => this.onLogoutClick('admin')} href="#"><span className="mdi mdi-logout dropdown-icon"></span>Logout</button></li>
                    </ul>
                ) : null }
            </>
        );

        if (!isEmpty(user)) {
            header = userHeader;
        } else if (!isEmpty(admin)) {
            header = adminHeader
        } else {
            header = guestHeader;
        }

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
                        {header}
                        <Link to="/cart/overview" className="grid-item">
                            <span style={{ marginRight: '5px' }} className="mdi mdi-cart-outline mdi-12px left"></span>My Cart 
                            <span className="cart">{cart.products.length}</span>
                        </Link>
                    </div>
                </section>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <ul className="hide-on-med-and-down">
                                {/* <li><Link to="">Services</Link></li> */}
                                <li><Link to="/fashion">Fashion</Link></li>
                                <li><Link to="/gadgets">Gadgets</Link></li>
                                <li><Link to="/cosmetics">Cosmetics</Link></li>
                                <li><Link to="/home-and-office">Home &amp; Office</Link></li>
                                <li><Link to="/groceries">Groceries</Link></li>
                                <li><Link to="/babies">Babies</Link></li>
                                <li><Link to="/books">Books</Link></li>
                                <li><Link to="/others">Others</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <ul id="mobile-menu" className="sidenav">
                    <li><Link to="/">Home</Link></li>
                    <li className="divider"></li>
                    {/* <li><Link to="">Services</Link></li> */}
                    <li><Link to="/fashion">Fashion</Link></li>
                    <li><Link to="/gadgets">Gadgets</Link></li>
                    <li><Link to="/cosmetics">Cosmetics</Link></li>
                    <li><Link to="/home-and-office">Home &amp; Office</Link></li>
                    <li><Link to="/groceries">Groceries</Link></li>
                    <li><Link to="/babies">Babies</Link></li>
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/others">Others</Link></li>
                </ul>
            </>
        );
    }
};

Navigation.propTypes = {
    logoutAdmin: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    user: state.user,
    cart: state.cart
});

export default connect(mapStateToProps, { logoutAdmin, logoutUser })(withRouter(Navigation));