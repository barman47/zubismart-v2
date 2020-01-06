import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import M from 'materialize-css';

import isEmpty from '../../validation/is-empty';
import { clearErrors } from '../../actions/productsActions';

import TextInput from '../input-group/TextInput';


const AddProduct = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    
    // componentDidMount
    useEffect(() => {
        const elems = document.querySelectorAll('select');
        //eslint-disable-next-line
        const instances = M.FormSelect.init(elems, {});

        const elems2 = document.querySelectorAll('.tooltipped');
        const instances2 = M.Tooltip.init(elems, {
            position: 'top'
        });
    }, []);

    // componentWillReceiveProps
    useEffect(() => {
        if (!isEmpty(props.errors)) {
            setErrors(props.errors);
        }
    }, [props.errors]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const product = new FormData();
        product.append('name', name);
        product.append('description', description);
        product.append('category', category);
        product.append('price', price);
        product.append('image', image);

        console.log(product);

        axios.post('/api/products/add', product, {
            headers: {
                'Content-Type': 'multipart-form-data'
            },
            onUploadProgress: (ProgressEvent) => {
                setUploadProgress(ProgressEvent.loaded / ProgressEvent.total * 100)
            }})
            .then(res => {
                M.toast({
                    html: 'Product Added Successfully',
                    classes: 'toast-valid',
                    completeCallback: () => {
                        setUploadProgress(0);
                        setName('');
                        setDescription('');
                        setCategory('');
                        setPrice('');
                        setImage('');
                        setErrors({});
                        document.querySelector('.add-product-form').reset();
                    }
                });
            })
            .catch(err => {
                setErrors(err.response.data);
            });
    };

    return (
        <>
            <>
                <Helmet><title>Admin - Add Product | Zubismart.com</title></Helmet>
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
                    <form className="add-product-form" onSubmit={handleFormSubmit}>
                        <h3>Add New Product</h3>
                        <div className="row">
                            <div className="input-field col s12">
                                <span className="mdi mdi-account prefix"></span>
                                <select 
                                    data-tooltip="Product Category is required"
                                    className="tooltipped"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" defaultChecked disabled>Select Product Category</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Gadgets">Gadgets</option>
                                    <option value="Home/Office">Home/Office</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Babies">Babies</option>
                                    <option value="Books">Books</option>
                                    <option value="Events">Events</option>
                                    <option value="Others">Others</option>
                                </select>
                                <label htmlFor="category">Product Category</label>
                                {errors.category ? (<span className="helper-text invalid-text">{errors.category}</span>) : null}
                            </div>
                        </div>

                        <TextInput 
                            icon="mdi mdi-account"
                            label="Product Name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            errorMessage={errors.name}
                            info="Title of product to be displayed to users"
                            title="Product name is required"
                        />

                        <TextInput 
                            icon="mdi mdi-account"
                            label="Product Price"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            errorMessage={errors.price}
                            info="Product price in &#x20A6;"
                            title="Product price is required"
                        />
                        <div className="row">
                            <div className="col s12 input-field">
                                <textarea 
                                    id="description" 
                                    className={classnames('materialize-textarea form-input input-field'), {
                                        'invalid': errors.description
                                    }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                                <label htmlFor="description">Product Description</label>
                                <span className="helper-text">Product description should contain vital and descriptive information about the product</span>
                                {errors.description ? (<span className="helper-text invalid-text">{errors.description}</span>) : null}
                            </div>
                        </div>

                        <div className="row">
                            <div className="file-field input-field">
                                <div className="btn">
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
                                        value={image}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    {errors.image ? (<span className="helper-text invalid-text">{errors.image}</span>) : null}
                                </div>
                            </div>
                        </div>
                        <div className="upload-progress" style={{ style: `${Math.round(uploadProgress, 2)}` }} /*style={{width: Math.round(uploadProgress, 2)}}*/>{Math.round(uploadProgress, 2)}%</div>
                        <button className="btn btn-large add-product">Add Product</button>
                    </form>
                </section>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    errors: state.errors
});

AddProduct.propTypes = {
    clearErrors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { clearErrors })(AddProduct);