import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import numeral from 'numeral';

import { getHomepageProducts } from '../actions/productsActions';
import { addToCart, getCartItems } from '../actions/cartActions';

class FeaturedProducts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            products: [],
            user: {}
        };
    }

    componentDidMount () {
        this.props.getHomepageProducts();
        if (this.props.user.authenticated) {
            this.setState({ user: this.props.user.user }, () => this.props.getCartItems(this.state.user));
        }

        const elems = document.querySelectorAll('.tooltipped');
        // eslint-disable-next-line
        const instances = M.Tooltip.init(elems, {});
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        const { user, products } = nextProps;
        if(user.authenticated === false) {
            this.setState({ user: {} });
        } else {
            this.setState({ user: user.user });
        }

        if (products.products.length !== 0) {
            this.setState({
                loading: false,
                products: products.products
            });
        } else {
            this.setState({ loading: false });
        }
    }

    addToCart = (e, item, user) => {
        e.preventDefault();
        const product = { quantity: 1, product: item };
        this.props.addToCart(product, user);
    };

    render () {
        const { loading, products, user } = this.state;

        let productsToDisplay;
        if (loading === true && products.length === 0) {
            productsToDisplay = <Skeleton />
        } else if (loading === false && products.length > 0) {
            productsToDisplay = products.map((product) => (
                <div key={product._id} className="col s12 m6 l3 product">
                    <Link to={`/products/${product.category}/${product._id}`}>
                        <div className="card">
                            <div className="card-image">
                                <img src={`/static/uploads/${product.image}`}  alt={product.name} />  
                                <button 
                                    className="btn-floating halfway-fab tooltipped"
                                    data-tooltip="Add to Cart"
                                    data-position="top"
                                >
                                    <span 
                                        className="mdi mdi-cart-plus cart-icon" 
                                        onClick={(e) => this.addToCart(e, product, user)}
                                    >
                                    </span>
                                </button>
                            </div>
                            <div className="card-content">
                                <h5>{product.name}</h5>
                                <h6 className="truncate">{product.description}</h6>
                            </div>
                            <div className="card-action">
                                <h5><span className="mdi mdi-currency-ngn price-icon"></span>{numeral(product.price).format('0,0')}</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            ));
        } else {
            productsToDisplay = (<h1>No Products to Display</h1>);
        }

        return (
            <div>
                <h5 className="sub-header">Featured Products</h5>
                <div className="products row">
                    {productsToDisplay}
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    products: state.products,
    user: state.user
});

FeaturedProducts.propTypes = {
    addToCart: PropTypes.func.isRequired,
    getHomepageProducts: PropTypes.func.isRequired,
    getCartItems: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addToCart, getCartItems, getHomepageProducts })(FeaturedProducts);