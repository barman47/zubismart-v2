import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import { addBrand } from '../../actions/brandActions';

import isEmpty from '../../validation/is-empty';

import TextInput from '../input-group/TextInput';
import AdminBreadCrumb from '../common/AdminBreadCrumb';

const AddBrand = (props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    // componentDidMount 
    useEffect(() => {
        const elems = document.querySelectorAll('select');
        // eslint-disable-next-line
        const instances = M.FormSelect.init(elems, {});
    });

    useEffect(() => {
        if (isEmpty(props.errors)) {
            setName('');
            setCategory('');
            setErrors({});
            const elems = document.querySelectorAll('select');
            // eslint-disable-next-line
            const instances = M.FormSelect.init(elems, {});
        }

        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const brand = {
            name,
            category
        };

        props.addBrand(brand);
    };

    return (
        <>
            <>
                <Helmet><title>Add Brand | Zubismart.com</title></Helmet>
                <AdminBreadCrumb 
                    title="Add Brand"
                    link="/admin/brands/add"
                    linkText="Brands"
                />
            </>
            <div className="dashboard">
                <section className="left-aside admin">
                    <div>
                        <h6><span className="mdi mdi-account mdi-24px profile-icon"></span>Products &amp; Services</h6>
                        <ul>
                            <li><Link to="/admin/products">Products</Link></li>
                            <li><Link to="/admin/services">Services</Link></li>
                            <li><Link to="/admin/products/add">Add Product</Link></li>
                            <li><Link to="/admin/services/add">Add Service</Link></li>
                            <li><Link to="/admin/brands/add" style={{ color: '#a7b018', fontWeight: 'bold' }}>Add Brand</Link></li>
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
                    <div className="brand">
                        <form onSubmit={handleFormSubmit} className="brand-form" noValidate>
                            <h3>Add New Brand</h3>
                            <TextInput
                                id="name"
                                label="Enter Brand Name"
                                icon="mdi mdi-alphabetical-variant"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                errorMessage={errors.name}
                            />
                            <div className="row">
                                <div className="input-field col s12">
                                    <span className="mdi mdi-shopify prefix"></span>
                                    <select 
                                        data-tooltip="Brand Category is required"
                                        className="tooltipped"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="" defaultChecked disabled>Select Brand Category</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Gadgets">Gadgets</option>
                                        <option value="Home/Office">Home/Office</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Babies">Babies</option>
                                        <option value="Books">Books</option>
                                        <option value="Events">Events</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <label htmlFor="category">Brand Category</label>
                                    {errors.category ? (<span className="helper-text invalid-text">{errors.category}</span>) : null}
                                </div>
                            </div>
                            <div className="col s12 input-field">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>  
        </>
    );
};

AddBrand.propTypes = {
    addBrand: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    brands: state.brands,
    errors: state.errors
});

export default connect(mapStateToProps, { addBrand })(AddBrand);