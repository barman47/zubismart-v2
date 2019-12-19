import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const breadcrumb = ({ title, link }) => {
    return (
        <div className="breadcrumb">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/account/profile">My Account</Link><span className="mdi mdi-chevron-right chevron-icon breadcrumb-icon"></span></li>
                <li><Link className="active" to="/account/profile">{link}</Link><span className="mdi mdi-chevron-right chevron-icon breadcrumb-icon"></span></li>
            </ul>
            <h2>{title}</h2>
        </div>
    );
}

breadcrumb.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default breadcrumb;