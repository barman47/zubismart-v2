import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import { GeneralBreadCrumb } from '../common/breadcrumb';

import { decreaseItemCount, increaseItemCount, getCartItems, removeCartItem } from '../../actions/cartActions';

class Overview extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            user: this.props.user,
            items: 0,
            total: 0,
            loading: true
        };   
    }

    componentDidMount () {
        this.props.getCartItems(this.state.user.user);
        const { cart } = this.props;

        let totalAmount = 0;
        cart.products.forEach(product => {
            totalAmount = totalAmount + (product.product.price * product.quantity);
        });

        this.setState({
            items: cart.products.length,
            total: totalAmount
        });
    }

    static getDerivedStateFromProps (props, state) {
        const { cart } = props;
        if (props.cart.products.length > 0 || state.cart.products.length !== cart.products.length || props.cart.products !== state.cart.products) {
            let totalAmount = 0;
            cart.products.forEach(product => {
                totalAmount = totalAmount + (product.product.price * product.quantity);
            });
            return {
                cart,
                items: cart.products.length,
                total: totalAmount
            };
        }
        return null;
    }

    setProductQuantity = (name, cart) => {
        switch (name) {
            case 'minus':
                this.props.decreaseItemCount(cart, this.state.user);
                break;

            case 'plus':
                this.props.increaseItemCount(cart, this.state.user);
                break;
            
            default:
                break;
        }
    }

    removeItem = (cartId, productId) => {
        this.props.removeCartItem(cartId, productId, this.state.user);
    }

    goBack = () => {
        this.props.history.goBack();
    }
    
    render () {
        const { user, cart, items, total } = this.state; 
        let cartItems;
        if (cart) {
            try {
                cartItems = cart.products.map((product, index) => (
                    <tr key={index}>
                        <td className="product-image">
                            <img src={`/static/uploads/${product.product.image}`} alt={product.product.name} />
                            <p>{product.product.name}</p>
                        </td>
                        <td className="table-info">
                            <div className="quantity">
                                <button onClick={() => this.setProductQuantity('minus', product)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => this.setProductQuantity('plus', product)}>+</button>
                            </div>
                        </td>
                        <td className="table-info price">
                            <h6><span className="mdi mdi-currency-ngn"></span>{numeral(product.product.price * product.quantity).format('0,0')}</h6>
                            <small>{numeral(product.product.price).format('0,0')} X {product.quantity} items</small>
                        </td>
                        <td className="action-column action">
                            <button onClick={() => this.removeItem(cart._id, product.product._id)}>Remove Item</button><br />
                            <button>Save for Later</button>
                        </td>
                    </tr>
                ));
            } catch (err) {}
        }
        
        return (
            <>
                <>
                    <Helmet><title>Shopping Cart | zubismart.com</title></Helmet>
                </>
                <GeneralBreadCrumb link="/" title="Shopping Cart" />
                <section className="overview">
                    <button onClick={this.goBack} className="continue-shopping">
                        <span className="mdi mdi-arrow-left"></span>&nbsp;&nbsp;
                        Continue Shopping
                    </button>
                    <div className="content">
                        <div className="cart-details">
                            {
                                cart.products ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="table-info">Item Information</th>
                                                <th className="table-info">Quantity</th>
                                                <th className="table-info">Item Price</th>
                                                <th className="action-column">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems}
                                        </tbody>
                                    </table>
                                ) : <h1>No Items</h1>
                            }
                        </div>
                        <div className="order-summary">
                            <div className="flex-container">
                                <p>Order Summary</p>
                                <p>{items} Items</p>
                            </div>
                            <div className="flex-container">
                                <p>Subtotal</p>
                                <p>{numeral(total).format('0,0')}</p>
                            </div>
                            <div className="flex-container">
                                <p>Delivery Charges</p>
                                <small>Add your delivery<br /> address to checkout <br />to see delivery charges</small>
                            </div>
                            <div className="flex-container">
                                <p>Total</p>
                                <p>{numeral(total).format('0,0')}</p>
                            </div>
                            <div className="button-container">
                                <small>Excluding delivery charges</small>
                                <button>Continue to Checkout</button>
                            </div>
                        
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

Overview.propTypes = {
    decreaseItemCount: PropTypes.func.isRequired, 
    increaseItemCount: PropTypes.func.isRequired,
    getCartItems: PropTypes.func.isRequired,
    removeCartItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    cart: state.cart,
    products: state.products,
    user: state.user
});

export default connect(mapStateToProps, { decreaseItemCount, increaseItemCount, getCartItems, removeCartItem })(withRouter(Overview));