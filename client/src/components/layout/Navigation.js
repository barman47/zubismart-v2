import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import logo from '../../assets/img/logo2.png';

const Navigation = () => {
    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav');
        //eslint-disable-next-line
        const instances = M.Sidenav.init(elems, {});
    }, []);
    return (
        <>
            <section className="header-section">
                <div>
                    <Link to="#" className="sidenav-trigger" data-target="mobile-menu"><span className="mdi mdi-menu mdi-24px menu-icon"></span></Link>
                    <Link className="brand-logo" to="/">
                        <img src={logo} alt="Zubismart Logo" className="logo" />
                    </Link>
                    <input className="grid-item" type="search" placeholder="Looking for something? Search for Products, Categories, and Services" />
                    <button className="grid-item" type="submit"><span className="mdi mdi-magnify search-icon"></span></button>
                </div>
                <div>
                    <Link to="/account/register" className="grid-item">Register</Link>
                    {/* <Link to="#" className="grid-item">My Account</Link> */}
                    <Link to="/cart" className="grid-item"><span style={{ marginRight: '5px' }} className="mdi mdi-cart-outline mdi-12px left"></span>My Cart <span className="cart">0</span></Link>
                </div>
            </section>
            <nav>
                <div className="nav-wrapper">
                    <ul className="hide-on-med-and-down">
                        <li><Link to="">Fashion</Link></li>
                        <li><Link to="">Gadgets</Link></li>
                        <li><Link to="">Cosmetics/Beauty</Link></li>
                        <li><Link to="">Home Appliances/Furniture</Link></li>
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
                <li><Link to="">Fashion</Link></li>
                <li><Link to="">Gadgets</Link></li>
                <li><Link to="">Cosmetics/Beauty</Link></li>
                <li><Link to="">Home Appliances/Furniture</Link></li>
                <li><Link to="">Groceries</Link></li>
                <li><Link to="">Babies</Link></li>
                <li><Link to="">Books</Link></li>
                <li><Link to="">Events</Link></li>
                <li><Link to="">Others</Link></li>
                <li><Link to="">Services</Link></li>
            </ul>
        </>
    );
};

export default Navigation;