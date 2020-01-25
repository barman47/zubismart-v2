import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { GeneralBreadCrumb } from '../common/breadcrumb';

import img from '../../assets/img/slide4.jpg';
import Skeleton from 'react-loading-skeleton';

class Overview extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cart: [],
            items: 0,
            product: {},
            products: {},
            quantity: 0,
        };    
    }

    componentDidMount () {
        const { quantity } = this.props.location.state;
        const { cart, products } = this.props;

        if (this.props.location.state) {
            this.setState({
                cart,
                items: cart.length,
                product: products.product,
                products: products.products,
                quantity: quantity
            });
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
    
    render () {
        const { cart } = this.state;
        
        let cartItems;
        if (cart.length > 0) {
            cartItems = cart.map(product => (
                <tr key={product._id}>
                    <td className="product-image">
                        <img src={`/uploads/${product.image}`} alt={product.name} />
                        <p>{product.name}</p>
                    </td>
                    <td className="table-info">
                        <div className="quantity">
                            <button onClick={() => this.setProductQuantity('minus')}>-</button>
                            <span>1</span>
                            <button onClick={() => this.setProductQuantity('plus')}>+</button>
                        </div>
                    </td>
                    <td className="table-info price">
                        <h6>{numeral(product.price).format('0,0')}</h6>
                        <small>{numeral(product.price).format('0,0')} X 3 items</small>
                    </td>
                    <td className="action-column action">
                        <button>Remove Item</button><br />
                        <button>Save for Later</button>
                    </td>
                </tr>
            ));
        }
        
        return (
            <>
                <>
                    <Helmet><title>Shopping Cart | zubismart.com</title></Helmet>
                </>
                <GeneralBreadCrumb link="/" title="Shopping Cart" />
                <section className="overview">
                    <button className="continue-shopping">
                        <span className="mdi mdi-arrow-left"></span>&nbsp;&nbsp;
                        Continue Shopping
                    </button>
                    <div className="content">
                        <div className="cart-details">
                            {
                                cart.length > 0 ? (
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
                                ): <h3>No Items in cart</h3>
                            }
                        </div>
                        <div className="order-summary">
                            <div className="flex-container">
                                <p>Order Summary</p>
                                <p>3 Items</p>
                            </div>
                            <div className="flex-container">
                                <p>Subtotal</p>
                                <p>N345,000</p>
                            </div>
                            <div className="flex-container">
                                <p>Delivery Charges</p>
                                <small>Add your delivery<br /> address to checkout <br />to see delivery charges</small>
                            </div>
                            <div className="flex-container">
                                <p>Total</p>
                                <p>N205,000</p>
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

const mapStateToProps = (state) => ({
    cart: state.cart,
    products: state.products,
    user: state.user
});

export default connect(mapStateToProps)(withRouter(Overview));