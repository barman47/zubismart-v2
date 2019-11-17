import React from 'react';
import { Helmet } from 'react-helmet';

import Slider from './Slider';
import Advert from './Advert';
import FeaturedProducts from './FeaturedProducts';
import Parallax1 from './Parallax1';
import Parallax2 from './Parallax2';
import Discount from './Discount';


const Home = () => (
    <>
        <Helmet><title>Home | Zubismart</title></Helmet>
        <main>
            <Slider />
            <Advert />
            <FeaturedProducts />
            <Parallax1 />
            <Discount />
            <Parallax2 />   
        </main>
    </>
);

export default Home;