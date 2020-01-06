import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminBreadCrumb = ({ title, link, linkText }) => {
    return (
        <div className="breadcrumb">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to={link}>Admin</Link><span className="mdi mdi-chevron-right chevron-icon breadcrumb-icon"></span></li>
                <li><Link className="active" to={link}>{linkText}</Link><span className="mdi mdi-chevron-right chevron-icon breadcrumb-icon"></span></li>
            </ul>
            <h2>{title}</h2>
        </div>
    );
}

AdminBreadCrumb.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
};

export default AdminBreadCrumb;