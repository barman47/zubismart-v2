import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import Breadcrumb from '../common/breadcrumb';
import TextInput from '../input-group/TextInput';

import capitalize from '../../utils/capitalize';
import isEmpty from '../../validation/is-empty';

import { addAddress, removeAddress } from '../../actions/userActions';

class Address extends Component {
    constructor (props) {
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            addresses: [],
            errors: {}
        }
        this.addressForm = React.createRef();
        this.modalCloseButton = React.createRef();
    }

    // componentDidMount
    componentDidMount () {
        const elems = document.querySelectorAll('.modal');
        //eslint-disable-next-line
        const instances = M.Modal.init(elems, {
            onCloseEnd: () => this.clearAddressForm()
        });
        this.setState({
            addresses: this.props.user.user.address
        });
    }

    UNSAFE_componentWillReceiveProps (nextProps, prevState) {
        if (nextProps.user.user.address !== prevState.address) {
            this.setState({
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                addresses: nextProps.user.user.address,
                errors: {}
            }, () => {
                this.addressForm.current.reset();
                this.modalCloseButton.current.click();
            }); 
        }
        

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    clearAddressForm = () => {
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            errors: {}
        });
        this.addressForm.current.reset();
    }

    removeAddress = (id) => {
        const addressId = { id };
        this.props.removeAddress(addressId);
    }

    showEditModal = (addressData) => {
        const { firstName, lastName, phone, address } = addressData;
        this.setState({ 
            firstName, 
            lastName,
            phone,
            address
         });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, phone, address } = this.state;
        const deliveryAddress = {
            firstName,
            lastName,
            phone,
            address 
        };
        this.props.addAddress(deliveryAddress);
    }

    render () {
        const { addresses, firstName, lastName, phone, address, errors } = this.state;
        const deliveryAddresses = addresses.map((address, index) => (
            <div key={index} className="address">
                <section className="address-header">
                    <h6>Address {index + 1}</h6>
                    <div>
                        <button onClick={() => this.showEditModal({ 
                            firstName: address.firstName,
                            lastName: address.lastName,
                            phone: address.phone,
                            address: address.address
                         })} 
                         className="modal-trigger" 
                         data-target="address-modal"
                         >
                            Edit
                        </button>
                        <button onClick={() => this.removeAddress(address._id)}>Delete</button>
                    </div>
                </section>
                <section className="address-content">
                    <p><span className="mdi mdi-account address-icon"></span>&nbsp;&nbsp;{capitalize(address.firstName)} {capitalize(address.lastName)}</p>
                    <p><span className="mdi mdi-home-circle-outline address-icon"></span>&nbsp;&nbsp;{address.address}</p>
                    <p><span className="mdi mdi-cellphone-android address-icon"></span>&nbsp;&nbsp;{address.phone}</p>
                </section>
            </div>
        ));
        return (
            <>
                <Helmet><title>Delivery Addresses | Zubismart.com</title></Helmet>
                <Breadcrumb 
                    title="Delivery Addresses"
                    link="deliveryAddress"
                    linkText="My Delivery Addresses"
                />
                <div className="dashboard">
                    <section className="left-aside">
                        <div>
                            <h6><span className="mdi mdi-account mdi-24px profile-icon"></span>My Profile</h6>
                            <ul>
                                <li><Link to="/account/profile">Account Information</Link></li>
                                <li><Link to="/account/deliveryAddress" style={{ color: '#a7b018', fontWeight: 'bold' }}>Delivery Address</Link></li>
                            </ul>
                        </div>
                        <div><br/>
                            <h6><span className="mdi mdi-bookmark-check mdi-24px profile-icon"></span>My Orders</h6>
                            <ul>
                                <li><Link to="/account/orders">zubismart.com</Link></li>
                            </ul>
                        </div><br/>
                        <div>
                            <h6><span className="mdi mdi-wallet-outline mdi-24px profile-icon"></span>My Wallet</h6>
                            <ul>
                                <li><Link to="/account/wallet">Wallet</Link></li>
                            </ul>
                        </div>
                    </section>
                    <section className="main-content">
                        <div id="address-modal" className="modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Add Delivery Address</h4>
                                    <span className="mdi mdi-truck-fast-outline address-header-icon"></span>
                                </div>
                                <form ref={this.addressForm} onSubmit={this.handleFormSubmit}>
                                    <TextInput 
                                        icon="mdi mdi-account"
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={this.onChange}
                                        errorMessage={errors.firstName}
                                    />
                                    <TextInput 
                                        icon="mdi mdi-account"
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        placeholder="Last Name"
                                        onChange={this.onChange}
                                        errorMessage={errors.lastName}
                                    />
                                    <TextInput 
                                        icon="mdi mdi-cellphone-android"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        placeholder="Mobile Number"
                                        onChange={this.onChange}
                                        errorMessage={errors.phone}
                                        info="e.g. 08012345678"
                                    />
                                    <div className="row">
                                        <div className="col s12 input-field">
                                            <span className="mdi mdi-truck-delivery-outline prefix"></span>
                                            <textarea 
                                                name="address" 
                                                id="address" 
                                                className={`form-input materialize-textarea`} 
                                                placeholder="Delivery Address"
                                                value={address} 
                                                onChange={this.onChange}
                                            >
                                            </textarea>
                                            {errors.address ? (<span className="helper-text invalid-text">{errors.address}</span>) : null}
                                        </div>
                                    </div>
                                    <div className="form-buttons">
                                        <button onClick={this.handleFormSubmit} type="submit" className="save-address">Save Address</button>
                                        <button ref={this.modalCloseButton} type="button" className="modal-close ">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <>
                            {isEmpty(addresses) ? (
                                <div className="no-address">
                                    <h2>Oh My!!</h2>
                                    <span className="mdi mdi-emoticon-sad-outline sad-face"></span>
                                    <h4>There is no Address to deliver your products to.</h4>
                                    <button onClick={this.clearAddressForm} data-target="address-modal" className="modal-trigger">Add Address</button>
                                </div>
                            ) : (
                                <div className="available-address">
                                    <button data-target="address-modal" className="add-address modal-trigger">Add Address</button>
                                    <div className="addresses">
                                        {deliveryAddresses}
                                    </div>
                                </div>
                            )}
                        </>
                    </section>
    
                </div>
            </>
        );
    }
}

Address.propTypes = {
    addAddress: PropTypes.func.isRequired,
    removeAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user
});

export default connect(mapStateToProps, { addAddress, removeAddress })(Address);