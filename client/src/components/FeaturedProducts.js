import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import numeral from 'numeral';

import { getHomepageProducts, getProduct } from '../actions/productsActions';
import { addToCart } from '../actions/cartActions';

const FeaturedProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    //componentDidMount
    useEffect(() => {
        props.getHomepageProducts();

        const elems = document.querySelectorAll('.tooltipped');
        // eslint-disable-next-line
        const instances = M.Tooltip.init(elems, {});
    }, []);

    useEffect(() => {
        if (props.products.products.length !== 0) {
            setProducts(props.products.products);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [props.products.products]);

    const addToCart = (e, item) => {
        e.preventDefault();
        props.addToCart(item);
    };

    let productsToDisplay;
    if (loading === true && products.length === 0) {
        productsToDisplay = <Skeleton />
    } else if (loading === false && products.length > 0) {
        productsToDisplay = products.map((product) => (
            <div key={product._id} className="col s12 m6 l3 product">
                <Link to={`/products/${product.category}/${product._id}`}>
                    <div className="card">
                        <div className="card-image">
                            <img src={`/uploads/${product.image}`}  alt={product.name} />  
                            <button 
                                className="btn-floating halfway-fab tooltipped"
                                data-tooltip="Add to Cart"
                                data-position="top"
                            >
                                <span 
                                    className="mdi mdi-cart-plus cart-icon" 
                                    onClick={(e) => addToCart(e, product)}
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
};

const mapStateToProps = state => ({
    products: state.products
});

FeaturedProducts.propTypes = {
    addToCart: PropTypes.func.isRequired,
    getHomepageProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addToCart, getHomepageProducts })(FeaturedProducts);