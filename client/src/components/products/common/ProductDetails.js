import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Skeleton from 'react-loading-skeleton';
import M from 'materialize-css';

import { buyNow, getProduct } from '../../../actions/productsActions';
import { addToCart, decreaseItemCount, increaseItemCount } from '../../../actions/cartActions';

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
                    this.setState(prevState => ({
                        quantity: prevState.quantity + 1
                    }));
                    break;
    
                case 'minus':
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
                    this.props.increaseItemCount(product, this.state.user);
                    break;
    
                case 'minus':
                    if (this.state.quantity !== 1) {
                        this.props.decreaseItemCount(product, this.state.user);
                    }
                    break;
    
                default:
                    break;
            }
        }
    }

    addToCart = () => {
        const product = { quantity: 1, product: this.state.product};
        this.props.addToCart(product, this.state.user);
    }

    share = () => {
        navigator.share({
            title: 'Web Share API Polyfill',
            text: 'A polyfill for the Share API. Use it to share in both desktops and mobile devices.',
            url: `https://zubismart.com/${this.props.location.pathname}`
        }, {
            // change this configurations to hide specific unnecessary icons
            copy: false,
            email: true,
            print: false,
            sms: true,
            messenger: true,
            facebook: true,
            whatsapp: true,
            twitter: true,
            linkedin: true,
            telegram: true,
            skype: true,
            language: 'en'
          })
        .then(() => M.toast({ html: 'Item Shared Successfully', classes: 'toast-valid' }))
        .catch(() => M.toast({ html: 'Sharing Failed', classes: 'toast-invalid' }));
    }

    render () {
        const { hideNumber, product, quantity, user } = this.state;
        const { setHideNumber } = this;
        return (
            <div>
            <section className="product-details">
                <div className="product-information">
                    <section className="product-image">
                        {product.image ? <img src={`/static/uploads/${product.image}`} alt={product.name} /> : <Skeleton />}
                        <div className="sliding-image">
                            {product.image ? <img src={`/static/uploads/${product.image}`} alt={product.name} /> : <Skeleton />}
                            {product.image ? <img src={`/static/uploads/${product.image}`} alt={product.name} /> : <Skeleton />}
                            {product.image ? <img src={`/static/uploads/${product.image}`} alt={product.name} /> : <Skeleton />}
                        </div>
                    </section>
                    <section>
                        {product.name ? (<h5 className="product-info-text">{product.name}</h5>) : <Skeleton />}
                        {product.brand ? (<p className="product-info-text">Brand: {product.brand}</p>) : <Skeleton />}
                        {product.size && <h6 className="product-info-text">product.size</h6>}
                        {product.color && (<p className="product-info-text">Color: product.color</p>)}
                        {product.productCode ? (<p className="product-info-text">Product Code: {product.productCode}</p>) : <Skeleton />}
                        {product.price ? (<h5 className="product-info-text"><span className="mdi mdi-currency-ngn price-icon"></span>{numeral(product.price).format('0,0')}</h5>) : <Skeleton />}
                        <section className="info quantity">
                            <p>Quantity:</p>
                            <div>
                                <button onClick={() => this.setProductQuantity('minus', product)}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => this.setProductQuantity('plus', product)}>+</button>
                            </div>
                        </section>
                    </section>
                </div>
                <div className="product-actions">
                    <button onClick={this.addToCart}>Add To Cart</button>
                    <button onClick={this.buyNow}>Buy Now</button>
                    <div>
                        <p>Let people know what you're buying</p>
                        {/* <span>Share this item with friends now</span> */}
                        <span title="Share with friends" onClick={this.share} className="mdi mdi-share-variant mdi-24px share-icon"></span>
                    </div>
                </div>
            </section>
            <div className="description">
                <h5>Description</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus inventore error non sit et est quod, doloribus eaque aut veniam repellat laborum quos cumque voluptas debitis dolorem quis sint assumenda rem itaque. Illo blanditiis voluptas, cum eaque quibusdam rem eum ullam qui corporis obcaecati ad ex, vel accusamus deserunt quisquam suscipit repellendus, est minima. Eligendi rerum harum autem ex architecto libero dolore? Explicabo, et cumque. Nam, maxime laboriosam dolorum, placeat distinctio officiis iure eius provident tempore, reiciendis labore praesentium blanditiis ea modi hic perspiciatis sed facere earum. Error fugiat inventore porro ea ipsa non nemo possimus quasi eligendi maiores beatae reiciendis magni eaque, facilis labore dolores saepe earum, veritatis asperiores repellat. Consequuntur quas minima ad ipsa debitis exercitationem dolorum blanditiis placeat atque illo libero, iure harum sit odit labore! Saepe beatae porro quasi natus dolorum perferendis nisi non, voluptate ullam corrupti quos explicabo doloribus soluta officiis omnis aliquam blanditiis magni voluptates, officia possimus! Laudantium architecto tempora deleniti ab, quam ea fugit exercitationem quibusdam eos voluptatum beatae magni modi, provident, eaque nobis? Ipsa atque, sunt id dolores vitae eum quod, nesciunt reiciendis, quas a ducimus earum voluptates inventore illum recusandae fugit adipisci veniam molestias tenetur quo fugiat quis nihil aut? Optio quod maiores asperiores deserunt laudantium sapiente, impedit dicta rerum explicabo harum minima! Natus repudiandae alias ipsa harum iusto quibusdam dolore nam vero! Voluptatum vitae et numquam pariatur impedit eum perferendis officia ipsa. Quae animi doloremque at reiciendis natus, cumque repellat repellendus asperiores facilis earum commodi! Tempora officiis, culpa cumque quaerat asperiores ab odio nihil quo, consequuntur, distinctio autem illum. Porro possimus blanditiis explicabo expedita culpa sapiente laboriosam hic, architecto similique placeat, rerum nisi suscipit eligendi? A facilis sit, totam hic magni impedit magnam tenetur repellendus suscipit? Consequuntur, culpa quis eum vero nobis sint mollitia, non provident, unde rerum repudiandae neque.</p>
            </div>
            <div className="return-policy">
                <h5>Return Policy</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus inventore error non sit et est quod, doloribus eaque aut veniam repellat laborum quos cumque voluptas debitis dolorem quis sint assumenda rem itaque. Illo blanditiis voluptas, cum eaque quibusdam rem eum ullam qui corporis obcaecati ad ex, vel accusamus deserunt quisquam suscipit repellendus, est minima. Eligendi rerum harum autem ex architecto libero dolore? Explicabo, et cumque. Nam, maxime laboriosam dolorum, placeat distinctio officiis iure eius provident tempore, reiciendis labore praesentium blanditiis ea modi hic perspiciatis sed facere earum. Error fugiat inventore porro ea ipsa non nemo possimus quasi eligendi maiores beatae reiciendis magni eaque, facilis labore dolores saepe earum, veritatis asperiores repellat. Consequuntur quas minima ad ipsa debitis exercitationem dolorum blanditiis placeat atque illo libero, iure harum sit odit labore! Saepe beatae porro quasi natus dolorum perferendis nisi non, voluptate ullam corrupti quos explicabo doloribus soluta officiis omnis aliquam blanditiis magni voluptates, officia possimus! Laudantium architecto tempora deleniti ab, quam ea fugit exercitationem quibusdam eos voluptatum beatae magni modi, provident, eaque nobis? Ipsa atque, sunt id dolores vitae eum quod, nesciunt reiciendis, quas a ducimus earum voluptates inventore illum recusandae fugit adipisci veniam molestias tenetur quo fugiat quis nihil aut? Optio quod maiores asperiores deserunt laudantium sapiente, impedit dicta rerum explicabo harum minima! Natus repudiandae alias ipsa harum iusto quibusdam dolore nam vero! Voluptatum vitae et numquam pariatur impedit eum perferendis officia ipsa. Quae animi doloremque at reiciendis natus, cumque repellat repellendus asperiores facilis earum commodi! Tempora officiis, culpa cumque quaerat asperiores ab odio nihil quo, consequuntur, distinctio autem illum. Porro possimus blanditiis explicabo expedita culpa sapiente laboriosam hic, architecto similique placeat, rerum nisi suscipit eligendi? A facilis sit, totam hic magni impedit magnam tenetur repellendus suscipit? Consequuntur, culpa quis eum vero nobis sint mollitia, non provident, unde rerum repudiandae neque.</p>
            </div>
            </div>
        //     <div className="product-details">
        //         <div className="image-container">
        //             <img className="product-image" src={`/static/uploads/${product.image}`}  alt={product.name} />  
        //         </div>
        //         <div>
        //             <div className="details-info">
        //                 {
        //                     product.name ? 
        //                     (
        //                         <>
        //                             <h4 className="info product-name">{product.name}</h4>
        //                             <p className="product-code">Product Code: <span>{product.productCode}</span></p>
        //                             <p className="brand">Brand: <span>{product.brand}</span></p>
        //                         </>
        //                     ) :
        //                     <Skeleton />
        //                 }
        //                 {product.price ? 
        //                     (<h5><span className="mdi mdi-currency-ngn price-icon"></span>{numeral(product.price).format('0,0')}</h5>) :
        //                     <Skeleton /> 
        //                 }
        //             </div>
        //             <section className="info quantity">
        //                 <p>Quantity:</p>
        //                 <div>
        //                     <button onClick={() => this.setProductQuantity('minus', product)}>-</button>
        //                     <span>{quantity}</span>
        //                     <button onClick={() => this.setProductQuantity('plus', product)}>+</button>
        //                 </div>
        //                 <div>
        //                     <p>Call us for bulk purchases</p>
        //                     {
        //                         hideNumber === true ? (<p className="show-number" onClick={() => setHideNumber()}>Show number</p>) : (<p>08012345678</p>)
        //                     }
        //                 </div>
        //             </section>
        //             <div className="buy-now info">
        //                 <button onClick={this.buyNow}>Buy Now</button>
        //                 <span className="mdi mdi-cards-heart mdi-24px favourite" style={{ marginLeft: '5px' }}>
        //                 </span>
        //                 <span className="save">&nbsp;&nbsp;Save for Later</span>
        //             </div>
        //             <div className="share">
        //                 <p>Share with Friends</p>
                        
        //                 <span onClick={this.share} title="Share Product with friends" className="mdi mdi-share-variant mdi-24px share-icon facebook"></span>
        //                 {/* <span className="mdi mdi-facebook mdi-24px share-icon facebook"></span>
        //                 <span className="mdi mdi-twitter mdi-24px share-icon twitter"></span>
        //                 <span className="mdi mdi-whatsapp mdi-24px share-icon whatsapp"></span> */}
        //             </div>
        //         </div>
        //     </div>
        );
    }
}

ProductDetails.prodTypes = {
    addToCart: PropTypes.func.isRequired,
    buyNow: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    decreaseItemCount: PropTypes.func.isRequired,
    increaseItemCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.products,
    user: state.user
});

export default connect(mapStateToProps, { addToCart, buyNow, getProduct, decreaseItemCount, increaseItemCount })(withRouter(ProductDetails));