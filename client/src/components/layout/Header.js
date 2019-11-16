import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.jpg';

const Header = () => (
    <header>
        <section className="header-section">
            <div>
                <Link className="grid-item" to="/">
                    <img src={logo} alt="Zubismart Logo" className="logo" />
                </Link>
                <input className="grid-item" type="search" placeholder="Looking for something? Search for Products, Categories, and Services" />
                <button className="grid-item" type="submit"><span className="mdi mdi-magnify search-icon"></span></button>
            </div>
            <div>
                <Link to="#" className="grid-item">My Account</Link>
                <Link to="/cart"><span style={{ marginRight: '5px' }} className="mdi mdi-cart-outline mdi-12px left"></span>My Cart <span className="cart">0</span></Link>
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
    </header>
);

export default Header;