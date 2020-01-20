import React from 'react';
import { Link } from 'react-router-dom';

const SoldBy = () => (
    <div className="sold-by">
        <span>Z</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>Sold by <strong>Zubismart</strong></span>&nbsp;
        <Link to="/about">Learn More</Link>
    </div>
);

export default SoldBy;