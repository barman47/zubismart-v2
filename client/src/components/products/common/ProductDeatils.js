import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Skeleton from 'react-loading-skeleton';
import M from 'materialize-css';

import { getProduct } from '../../../actions/productsActions';

class ProductDeatils extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hideNumber: true,
            product: {},
            quantity: 1
        };
    }

    componentDidMount() {
        this.props.getProduct(this.props.match.params.id);
        const elems = document.querySelectorAll('.tooltipped');
        // esline-disable-next-line
        const instances = M.Tooltip.init(elems, {});
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.products) {
            this.setState({
                product: nextProps.products.product
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

    setHideNumber = () => {
        this.setState(prevState => ({
            hideNumber: !prevState.hideNumber
        }));
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
            .catch(err => console.error(err));   
        }
    }

    render () {
        const { hideNumber, product, quantity } = this.state;
        const { setHideNumber } = this;
        return (
            <div className="product-details">
                <div>
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
                            <button onClick={() => this.setProductQuantity('minus')}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => this.setProductQuantity('plus')}>+</button>
                        </div>
                        <div>
                            <p>Call us for bulk purchases</p>
                            {
                                hideNumber === true ? (<p className="show-number" onClick={() => setHideNumber()}>Show number</p>) : (<p>08012345678</p>)
                            }
                        </div>
                    </section>
                    <div className="buy-now info">
                        <button>Buy Now</button>
                        <span className="mdi mdi-cards-heart mdi-24px favourite" style={{ marginLeft: '5px' }}>
                        </span>
                        <span className="save">&nbsp;&nbsp;Save for Later</span>
                    </div>
                    <div className="share">
                        <p>Share with Friends</p>
                        
                        <span title="Share Product with friends" className="mdi mdi-share-variant mdi-24px share-icon facebook"></span>
                        {/* <span className="mdi mdi-facebook mdi-24px share-icon facebook"></span>
                        <span className="mdi mdi-twitter mdi-24px share-icon twitter"></span>
                        <span className="mdi mdi-whatsapp mdi-24px share-icon whatsapp"></span> */}
                    </div>
                </div>
            </div>
        );
    }
}

ProductDeatils.prodTypes = {
    getProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps, { getProduct })(withRouter(ProductDeatils));