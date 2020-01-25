import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Skeleton from 'react-loading-skeleton';
import M from 'materialize-css';

import { buyNow, getProduct } from '../../../actions/productsActions';
import { decreaseItemCount, increaseItemCount } from '../../../actions/cartActions';

import isEmpty from '../../../validation/is-empty';

class ProductDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hideNumber: true,
            product: {},
            user: {},
            quantity: 1
        };
    }

    componentDidMount() {
        this.setState({ user: this.props.user });
        this.props.getProduct(this.props.match.params.id);
        
        const elems = document.querySelectorAll('.tooltipped');
        // eslint-disable-next-line
        const instances = M.Tooltip.init(elems, {});
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.products) {
            this.setState({
                product: nextProps.products.product
            });
        }

        if (nextProps.user) {
            if (nextProps.user.authenticated === false) {
                this.setState({ user: {} });
            }
        }
    }

    setProductQuantity = (name) => {
        switch (name) {
            case 'minus':
                this.state.quantity === 1 ? this.setState(prevState => ({
                    quantity: prevState.quantity
                })) : this.setState(prevState => ({
                    quantity: prevState.quantity - 1
                }));
                break;

            case 'plus':
                this.setState(prevState => ({
                    quantity: prevState.quantity + 1 
                }));
                break;
            
            default:
                break;
        }
    }

    setHideNumber = () => {
        this.setState(prevState => ({
            hideNumber: !prevState.hideNumber
        }));
    }

    buyNow = () => {
        const product = { quantity: this.state.quantity, product: this.state.product };
        this.props.buyNow(product, this.state.user.user);
        this.props.history.push('/cart/overview', { quantity: this.state.quantity });
    }

    // Work on increasing cart items and fix upload folder
    setProductQuantity = (mode, product) => {
        if (isEmpty(this.state.user)) {
            switch (mode) {
                case 'plus':
                    console.log('increase item');
                    this.setState(prevState => ({
                        quantity: prevState.quantity + 1
                    }));
                    break;
    
                case 'minus':
                    console.log('decrease item');
                    if (this.state.quantity !== 1) {
                        this.setState(prevState => ({
                            quantity: prevState.quantity - 1
                        }));
                    }
                    break;
    
                default:
                    break;
            }
        } else {
            switch (mode) {
                case 'plus':
                    this.props.increaseItemCount(product, this.state.user.user);
                    break;
    
                case 'minus':
                    this.props.decreaseItemCount(product, this.state.user.user);
                    break;
    
                default:
                    break;
            }
        }
    }

    share = () => {
        if (Navigator.share) {
            const { product } = this.state;
            navigator.share({
                title: product.name,
                text: 'Check out this product from zubismart.com',
                url: window.location.href
            })
            .then(() => M.toast({
                html: 'Sharing Successful',
                classes: 'toast-valid'
            }))
            .catch(err => M.toast({
                html: 'Sharing Failed',
                classes: 'toast-invalid'
            }));   
        }
    }

    render () {
        const { hideNumber, product, quantity } = this.state;
        const { setHideNumber } = this;
        return (
            <div className="product-details">
                <div className="image-container">
                    <img className="product-image" src={`/uploads/${product.image}`}  alt={product.name} />  
                </div>
                <div>
                    <div className="details-info">
                        {
                            product.name ? 
                            (
                                <>
                                    <h4 className="info product-name">{product.name}</h4>
                                    <p className="product-code">Product Code: <span>{product.productCode}</span></p>
                                    <p className="brand">Brand: <span>{product.brand}</span></p>
                                </>
                            ) :
                            <Skeleton />
                        }
                        {product.price ? 
                            (<h5><span className="mdi mdi-currency-ngn price-icon"></span>{numeral(product.price).format('0,0')}</h5>) :
                            <Skeleton /> 
                        }
                    </div>
                    <section className="info quantity">
                        <p>Quantity:</p>
                        <div>
                            <button onClick={() => this.setProductQuantity('minus', product)}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => this.setProductQuantity('plus', product)}>+</button>
                        </div>
                        <div>
                            <p>Call us for bulk purchases</p>
                            {
                                hideNumber === true ? (<p className="show-number" onClick={() => setHideNumber()}>Show number</p>) : (<p>08012345678</p>)
                            }
                        </div>
                    </section>
                    <div className="buy-now info">
                        <button onClick={this.buyNow}>Buy Now</button>
                        <span className="mdi mdi-cards-heart mdi-24px favourite" style={{ marginLeft: '5px' }}>
                        </span>
                        <span className="save">&nbsp;&nbsp;Save for Later</span>
                    </div>
                    <div className="share">
                        <p>Share with Friends</p>
                        
                        <span onClick={this.share} title="Share Product with friends" className="mdi mdi-share-variant mdi-24px share-icon facebook"></span>
                        {/* <span className="mdi mdi-facebook mdi-24px share-icon facebook"></span>
                        <span className="mdi mdi-twitter mdi-24px share-icon twitter"></span>
                        <span className="mdi mdi-whatsapp mdi-24px share-icon whatsapp"></span> */}
                    </div>
                </div>
            </div>
        );
    }
}

ProductDetails.prodTypes = {
    buyNow: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    decreaseItemCount: PropTypes.func.isRequired,
    increaseItemCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.products,
    user: state.user
});

export default connect(mapStateToProps, { buyNow, getProduct, decreaseItemCount, increaseItemCount })(withRouter(ProductDetails));