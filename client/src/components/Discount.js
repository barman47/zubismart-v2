import React from 'react';

const Discount = () => (
    <div id="discount">
        <div className="advert-header">
            Launch Day <span>Discount</span>
        </div>
        <div id="advert-content">
            <div className="row">
                <div className="col s12 m8 l8">
                    <h3><span>Exclusive</span> Launch Day Discount</h3>
                    <p>up to <span>45<span>%</span></span> OFF!</p>
                    <p>for the first <span>30</span> Subscribers</p>  
                </div>
                <div className="col s12 m4 l4">
                    <button className="btn modal-trigger" data-target="loginModal">Register Now!</button>
                </div>
            </div>
        </div>
    </div>
);

export default Discount;