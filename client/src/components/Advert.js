import React from 'react';

const Advert = () => (
    <div id="advert" className="container row">
        <div className="col s12 l4 m6 advert-header">
            <h5>Electronics</h5>
            <a href="/products/phonesAndElectronics">View All</a>
            <div className="advert-item advert-item1"></div>
        </div>
        <div className="col s12 l4 m6 advert-header">
            <h5>Books</h5>
            <a href="/products/books">View All</a>
            <div className="advert-item advert-item2"></div>
        </div>
        <div className="col s12 l4 m6 advert-header">
            <h5>Clothing</h5>
            <a href="/products/fashion">View All</a>
            <div className="advert-item advert-item3"></div>
        </div>
    </div>
);

export default Advert;