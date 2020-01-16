import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import M from 'materialize-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBrands } from '../../actions/brandActions';

import TextInput from '../input-group/TextInput';
import AdminBreadCrumb from '../common/AdminBreadCrumb';


const AddService = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [price, setPrice] = useState('');
    const [shippingPrice, setShippingPrice] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    
    // componentDidMount
    useEffect(() => {
        const elems = document.querySelectorAll('select');
        // eslint-disable-next-line
        const instances = M.FormSelect.init(elems, {});

        props.getBrands();
    }, []);

    useEffect(() => {
        if (props.brands.length > 0) {
            setBrands(props.brands);
            const elems = document.querySelectorAll('select');
            // eslint-disable-next-line
            const instances = M.FormSelect.init(elems, {});
        }
    }, [props.brands]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const service = new FormData();
        service.append('name', name);
        service.append('description', description);
        service.append('category', category);
        service.append('price', price);
        service.append('shippingPrice', shippingPrice);
        service.append('image', image);

        axios.post('/api/services/add', service, {
            headers: {
                'Content-Type': 'multipart-form-data'
            },
            onUploadProgress: (ProgressEvent) => {
                setUploadProgress(ProgressEvent.loaded / ProgressEvent.total * 100)
            }})
            .then(res => {
                M.toast({
                    html: 'Service Added Successfully',
                    classes: 'toast-valid',
                    displayLength: 5000,
                    completeCallback: () => {
                        setUploadProgress(0);
                        setName('');
                        setDescription('');
                        setCategory('');
                        setPrice('');
                        setShippingPrice('');
                        setImage('');
                        setErrors({});
                        document.querySelector('.add-service-form').reset();

                        const elems = document.querySelectorAll('select');
                        // eslint-disable-next-line
                        const instances = M.FormSelect.init(elems, {});
                    }
                });
            })
            .catch(err => {
                setErrors(err.response.data);
                setUploadProgress(0);
            });
    };

    let brandsToDisplay;

    if (brands.length > 0) {
        brandsToDisplay = brands.map(brand => (
            <option key={brand._id} value={brand.name}>{brand.name}</option>
        ));
        const elems = document.querySelectorAll('select');
        // eslint-disable-next-line
        const instances = M.FormSelect.init(elems, {});
    } else {
        brandsToDisplay = (<option value=""  disabled>No Brands Available</option>);
    }

    return (
        <>
            <>
                <Helmet><title>Admin - Add Service | Zubismart.com</title></Helmet>
                <AdminBreadCrumb 
                    title="Add Service"
                    link="/admin/services/add"
                    linkText="Services"
                />
            </>
            <div className="dashboard">
                <section className="left-aside admin">
                    <div>
                        <h6><span className="mdi mdi-account mdi-24px profile-icon"></span>Services &amp; Services</h6>
                        <ul>
                            <li><Link to="/admin/products">Products</Link></li>
                            <li><Link to="/admin/services">Services</Link></li>
                            <li><Link to="/admin/products/add">Add Product</Link></li>
                            <li><Link to="/admin/services/add" style={{ color: '#a7b018', fontWeight: 'bold' }}>Add Service</Link></li>
                            <li><Link to="/admin/brands/add">Add Brand</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6><span className="mdi mdi-bookmark-check mdi-24px profile-icon"></span>Orders</h6>
                        <ul>
                            <li><Link to="/services/orders">View Orders</Link></li>
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
                    <h5>Add New Service</h5>
                    <form className="add-service-form" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <span className="mdi mdi-shopping-outline prefix"></span>
                                <select 
                                    data-tooltip="Service Category is required"
                                    className="tooltipped"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" defaultChecked disabled>Select Service Category</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Gadgets">Gadgets</option>
                                    <option value="Home/Office">Home/Office</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Babies">Babies</option>
                                    <option value="Books">Books</option>
                                    <option value="Events">Events</option>
                                    <option value="Others">Others</option>
                                </select>
                                <label htmlFor="category">Service Category</label>
                                {errors.category ? (<span className="helper-text invalid-text">{errors.category}</span>) : null}
                            </div>
                        </div>
                        
                        <TextInput 
                            icon="mdi mdi-alphabetical-variant"
                            label="Service Name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            errorMessage={errors.name}
                            info="Title of service to be displayed to users"
                            title="Service name is required"
                        />

                        <TextInput 
                            icon="mdi mdi-currency-ngn"
                            label="Service Price"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            errorMessage={errors.price}
                            info="Service price in naira (&#x20A6;)"
                            title="Service price is required"
                        />

                        <div className="row">
                            <div className="input-field col s12">
                                <span className="mdi mdi-alphabetical prefix"></span>
                                <textarea 
                                    id="description" 
                                    className={classnames('materialize-textarea validate', {
                                        'invalid': errors.description
                                    })}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >

                                </textarea>
                                <label htmlFor="description">Service Description</label>
                                <span className="helper-text">Service description should contain vital and descriptive information about the service</span>
                                {errors.description ? (<span className="helper-text invalid-text">{errors.description}</span>) : null}
                            </div>
                        </div>        
                        <div className="row">
                            <div className="file-field input-field">
                                <div className="btn add-image-button">
                                    <span>Add Image</span>
                                    <input
                                        type="file" 
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input 
                                        type="text" 
                                        id="image"
                                        className={classnames('file-path form-input validate', {
                                            'invalid': errors.image
                                        })}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    {errors.image ? (<span className="helper-text invalid-text">{errors.image}</span>) : null}
                                </div>
                            </div>
                        </div>
                        <div className="progress-container">
                            <div className="upload-progress" style={{ width: `${Math.round(uploadProgress, 2)}%` }}>
                                {
                                    Math.round(uploadProgress, 2) ?
                                    Math.round(uploadProgress, 2)
                                    :
                                    null   
                                }
                            </div>
                        </div>
                        
                        <button className="btn btn-large add-service">Add Service</button>
                    </form>
                </section>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    brands: state.brands
});

AddService.propTypes = {
    getBrands: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getBrands })(AddService);