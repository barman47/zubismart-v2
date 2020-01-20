import React from 'react'

const Footer = () => (
    <footer className="page-footer">
        <div className="section">
            <div className="row">
                <div className="col s12 m6 l3">
                    <h5>Support</h5>
                    <ul className="footer-link-list">
                        <li><a href="/termsOfUse">Terms of Use</a></li>
                        <li><a href="/privacyPolicy">Privacy Policy</a></li>
                        <li><a href="/returnPolicy">Return Policy</a></li>
                    </ul>
                </div>
                <div className="col s12 m6 l3">
                    <h5>Stuff We Do</h5>
                    <ul className="footer-link-list">
                        <li>Online Sales</li>
                        <li>Professional Services</li>
                        <li>Advert Placement</li>
                    </ul>
                </div>
                <div className="col s12 m6 l3">
                    <h5>Contact</h5>
                    <ul className="footer-link-list">
                        <li>University of Nigeria Nsukka, Enugu.</li>
                        <li>contact@zubismart.com</li>
                    </ul>
                </div>
                <div className="col s12 m6 l3">
                    <h5>About</h5>
                    <ul className="footer-link-list">
                        <li><a href="#!">Our Story</a></li>
                        <li><a href="#!">Maybe Something Else</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div id="left">
                <p style={{ color: '#a2a2a2' }}>Copyright &copy; {new Date().getFullYear()} Zubis Mart - Developed by <span className="myLink"><a href="https://www.domstech.com" rel="noopener noreferrer" target="_blank">Barman</a></span></p>
            </div>
            <div id="right">
                <h5>Connect</h5>
                <ul id="footerLink">
                    <li className="footerLinks"><a href="https://web.facebook.com/Zubismartonline-607558123008426/" rel="noopener noreferrer" target="_blank "><span className="mdi mdi-facebook"></span></a></li>
                    <li className="footerLinks"><a href="#!"><span className="mdi mdi-whatsapp" rel="noopener noreferrer" target="_blank "></span></a></li>
                    <li className="footerLinks"><a href="#!"><span className="mdi mdi-instagram" rel="noopener noreferrer" target="_blank "></span></a></li>
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;