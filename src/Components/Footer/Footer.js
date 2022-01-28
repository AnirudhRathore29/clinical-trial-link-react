import ContactForm from "../Common/ContactForm/ContactForm";
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    let location = useLocation();
    return (
        <>
            {location.pathname === "/login" || location.pathname === "/sign-up" || location.pathname === "/forgot-password" || location.pathname === "/my-subscription" || location.pathname === "/my-profile" ? null
            :
                <footer className={location.pathname === "/" || location.pathname === "/contact-us" ? "msingipack-ftr with-contact-form" : "msingipack-ftr"}>
                    {location.pathname === "/" || location.pathname === "/contact-us"
                        ?
                        <ContactForm />
                        :
                        null
                    }
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-4 msingipack-ftr-col">
                                        <h2>Terms</h2>
                                        <ul>
                                            <li><Link to="/#">Terms of Use</Link></li>
                                            <li><Link to="/#">Privacy Policy</Link></li>
                                            <li><Link to="/#">Refund Policy</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4 msingipack-ftr-col">
                                        <h2>Content Plans</h2>
                                        <ul>
                                            <li><Link to="/content-plans/bronze-plans">Bronze</Link></li>
                                            <li><Link to="/content-plans/silver-plans">Silver</Link></li>
                                            <li><Link to="/content-plans/gold-plans">Gold</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4 msingipack-ftr-col">
                                        <h2>Resources</h2>
                                        <ul>
                                            <li><Link to="/#">Getting started</Link></li>
                                            <li><Link to="/#">API Documentation</Link></li>
                                            <li><Link to="/#">Integrations</Link></li>
                                            <li><Link to="/#">Free Test Account</Link></li>
                                            <li><Link to="/#">FAQs</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 msingipack-ftr-col">
                                <h2>Contact Us</h2>
                                <p><span>Email:</span> <a href="mailto:hello@msingipack.com">hello@msingipack.com</a></p>
                                <p><span>Telephone:</span> <a href="tel:+254111044600">+254111044600</a></p>
                                <p><span>Address:</span> AppleWood Adams, Suite 511, Ngong Road P.O. Box 2422 - 00200 City Square, Nairobi, Kenya</p>
                                <div className="social-links">
                                    <Link to="/#"><img src="/images/facebook.svg" alt="icon" /></Link>
                                    <Link to="/#"><img src="/images/insta.svg" alt="icon" /></Link>
                                    <Link to="/#"><img src="/images/twitter.svg" alt="icon" /></Link>
                                    <Link to="/#"><img src="/images/linkedin.svg" alt="icon" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="copyright">
                            <Link to="/"><img src="/images/logo.svg" alt="logo" /></Link>
                            <p>© 2021 Msingi PACK</p>
                            <div className="payment-method">
                                <img src="/images/payment-method.png" alt="payment-method" />
                            </div>
                        </div>
                    </div>
                </footer>
            }
        </>
    );
}


export default Footer;