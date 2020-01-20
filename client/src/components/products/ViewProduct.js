import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ProductDetails from './common/ProductDeatils';
import SoldBy from './common/SoldBy';
import ProductInfo from './common/ProductInfo';

const ViewProduct = (props) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProduct(props.products.product);
    });

    return (
        <section className="view-product">
            <ProductDetails />
            <SoldBy />
            <ProductInfo description={product.description}/>
            <div className="similar-products">

            </div>
        </section>
    )
};

const mapStateToProps = (state)=> ({
    products: state.products
});

export default connect(mapStateToProps)(ViewProduct);