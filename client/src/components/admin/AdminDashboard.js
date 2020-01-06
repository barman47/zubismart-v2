import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdminBreadCrumb from '../common/AdminBreadCrumb';

import { getProducts } from '../../actions/productsActions';

class AdminDashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            products: {}
        };
    }

    componentDidMount () {
        this.props.getProducts();
    }

    render () {
        return (
            <>
                <>
                    <Helmet><title>Admin | Zubismart.com</title></Helmet>
                    <AdminBreadCrumb 
                        title="Products Information"
                        link="/admin/products"
                        linkText="Products"
                    />
                </>
                <div className="dashboard">
                    <section className="left-aside admin">
                        <div>
                            <h6><span className="mdi mdi-account mdi-24px profile-icon"></span>Products &amp; Services</h6>
                            <ul>
                                <li><Link to="/admin/products" style={{ color: '#a7b018', fontWeight: 'bold' }}>Products</Link></li>
                                <li><Link to="/admin/services">Services</Link></li>
                                <li><Link to="/admin/products/add">Add Product</Link></li>
                                <li><Link to="/admin/services/add">Add Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6><span className="mdi mdi-bookmark-check mdi-24px profile-icon"></span>Orders</h6>
                            <ul>
                                <li><Link to="/products/orders">View Orders</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6><span className="mdi mdi-account-group-outline mdi-24px profile-icon"></span>Users</h6>
                            <ul>
                                <li><Link to="/admin/users/all">Manage Users</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6><span className="mdi mdi-wallet-outline mdi-24px profile-icon"></span>Admin</h6>
                            <ul>
                                <li><Link to="/admin/profile">Manage Admin</Link></li>
                            </ul>
                        </div>
                    </section>
                    <section className="main-content">
                        <h5>Admin Section</h5>
                    </section>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

AdminDashboard.propTypes = {
    getProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getProducts })(AdminDashboard);