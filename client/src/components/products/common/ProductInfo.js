import React from 'react'

const ProductInfo = (props) => (
    <div className="product-info">
        <ul>
            <li>Description</li>
            <li>Shipping</li>
            <li>Warranty</li>
            <li>Return Policy</li>
            <li>Reviews</li>
        </ul>
        <p>{props.description}</p>
    </div>
);

export default ProductInfo;