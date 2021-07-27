import React, { useState } from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom';

function Footer() {

    const [input,setInput] = useState();

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log(input);
    }

    return (
        <div className="footer">
            <div className="footer__title-and-sub">
                <h4>Enter your email to subscribe to our newsletter!</h4>
                <div className="footer__subscribe">
                    <input type="email" className="footer__input" onChange={handleInput}/>
                    <button type="submit" onClick={handleSubmit}>Subscribe</button>
                </div>
            </div>
            <div className="footer__content">
                <div className="footer__information">
                    <h4>Information</h4>
                    <ul className="footer__information-links">
                        <li><Link to="/details/about-us">About us</Link></li>
                        <li><Link to="/details/contact">Contact us</Link></li>
                        <li><Link to="/details/terms-and-conditions">Terms and Conditions</Link></li>
                        <li><Link to="/details/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className="footer__customer">
                    <h4>Customer care</h4>
                    <ul className="footer__customer-links">
                        <li><Link to="/details/faq">FAQ</Link></li>
                        <li><Link to="/details/shipping">Shipping and delivery</Link></li>
                        <li><Link to="/details/returns">Returns and exchanges</Link></li>
                        <li><Link to="/details/faq">Payment FAQ</Link></li>
                    </ul>
                </div>
            </div>
            <p>© 2021 Bakmazon. All rights reserved.</p>
        </div>
    )
}

export default Footer
