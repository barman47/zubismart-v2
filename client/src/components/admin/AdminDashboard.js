import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import M from 'materialize-css';
import numeral from 'numeral';
import Moment from 'react-moment';

import AdminBreadCrumb from '../common/AdminBreadCrumb';

import { deleteProduct, getProducts, toggleProduct } from '../../actions/productsActions';
import isEmpty from '../../validation/is-empty';

class AdminDashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            product: {},
            products: []
        };
    }

    componentDidMount () {
        this.props.getProducts();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        const { products } = nextProps;
        if (products.products.length > 0 ) {
            this.setState({ products: products.products });
            if (!isEmpty(products.product)) {
                M.toast({
                    html: products.product.enabled ? `Product Enabled` : 'Product Disabled',
                    classes: 'toast-valid'
                });
            }
        }
    }

    deleteProduct = (id) => {
        this.props.deleteProduct(id);
    }

    toggleProduct = (id) => {
        this.props.toggleProduct(id);
    }

    render () {
        const { products } = this.state;

        const productsToDisplay = this.state.products.map((product, index) => (
            <tr key={index + 1}>
                <td>{product.name || <Skeleton />}</td>
                <td>{product.category || <Skeleton />}</td>
                <td><span className="mdi mdi-currency-ngn"></span>{numeral(product.price).format('0,0') || <Skeleton />}</td>
                <td>{<Moment format="Do MMMM, YYYY" date={product.dateAdded} /> || <Skeleton />}</td>
                <td>
                <label>
                    <input 
                        type="checkbox" 
                        className="filled-in product-state" 
                        defaultChecked={product.enabled}
                        onChange={() => this.toggleProduct(product._id)}
                    />
                    <span></span>
                </label>
                    <span
                        className="mdi mdi-delete action-icon"
                        onClick={() => this.deleteProduct(product._id)}
                    >
                    </span>
                </td>
            </tr>
        ));
        return (
            <>
                <>
                    <Helmet><title>Admin - Products | Zubismart.com</title></Helmet>
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
                                <li><Link to="/admin/brands/add">Add Brand</Link></li>
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
                    <section className="main-content admin">
                        <h5>Admin Section</h5>
                        {products.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Date Added</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsToDisplay}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no-products">
                                <span className="mdi mdi-emoticon-tongue emoji"></span>
                                <h1>No Products to Display</h1>
                            </div>
                        )}
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
    deleteProduct: PropTypes.func.isRequired,
    toggleProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteProduct, getProducts, toggleProduct })(AdminDashboard);