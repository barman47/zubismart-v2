import React, { useEffect } from 'react';

import slide1 from '../assets/img/slide1.jpg';
import slide2 from '../assets/img/slide2.jpg';
import slide3 from '../assets/img/slide3.jpg';
import slide4 from '../assets/img/slide4.jpg';
import slide5 from '../assets/img/slide5.jpg';

const Slider = () => {

    useEffect(() => {
        let elems = document.querySelectorAll('.slider');
        // eslint-disable-next-line
        let instances = M.Slider.init(elems, {});
    }, []);
    return (
        <div className="slider">
            <ul className="slides">
                <li>
                    <img className="slides" src={slide1} alt="Slide 1" />
                    <div className="caption center-align">
                        <h3 id="slide1-header" style={{ marginTop: '50px' }}>Welcome to Zubis Mart</h3>
                    </div>
                </li>		
                <li>
                    <img className="slides" src={slide2} alt="Slide 2" />
                    <div className="caption center-align">
                        <h3 id="slide2-header" className="section light">Your convenience is our concern.</h3>
                    </div>
                </li>		
                <li>
                    <img className="slides" src={slide3} alt="Slide 3" />
                    <div className="caption">
                        <h3 id="slide3-header">Get the most <br />affordable prices you can find</h3>
                    </div>
                </li>		
                <li>
                    <img className="slides" src={slide4} alt="Slide 4" />
                    <div className="caption center-align">
                        <h3 id="slide4-header">Improve your shopping experience</h3>
                        <h5 id="slide4-subtitle"className="section light">We offer the best!</h5>
                    </div>
                </li>		
                <li>
                    <img className="slides" src={slide5} alt="Slide 5" />
                    <div className="caption center-align">
                        <a className="btn waves-effect waves-light view-more" href="/products/fashion" style={{ marginTop: '70px' }}>More Wears</a>
                    </div>
                </li>				
            </ul>
        </div>
    );
};

export default Slider;