import SectionTitle from "../Common/SectionTitle/SectionTitle";
import { InputText } from '../Common/Inputs/Inputs';
import {Link} from 'react-router-dom';
import './FrontFooter.css';

const Footer = () => {
    return (
        <>
            <footer className='clinicaltrial-ftr'>
                <div className='download-app-bx'>
                    <div className='row align-items-center'>
                        <div className='col-lg-5'>
                            <img src="/images/download-app-img.png" alt="download-app" />
                        </div>
                        <div className='col-lg-7'>
                            <SectionTitle CustomClass="whiteTxt" title="Download the App Now" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text mx-0 pad-t-30">Lorem ipsum dolor sit amet consectetur dipiscing elit vivamus a dolor aliquam pulvinar augue ctum nibh curabitur vel lobortis eros nam eu lobortis pretium erat sit amet egestas neque.</p>} />
                            <div className="app-download-platform">
                                <Link to="/"><img src="/images/play-store-btn.svg" alt="play store" /></Link>
                                <Link to="/"><img src="/images/app-store-btn.svg" alt="play store" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='row ftr-row'>
                        <div className='col-lg-8'>
                            <div className='row'>
                                <div className='col-lg-6 clinicaltrial-ftr-col about-col'>
                                    <img src="/images/logo.svg" alt="clinical trial logo" />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit  a dolor aliquam pulvinar augue at dictum nibh abitur vel lobortis eros am eu sem lobortis pretium erat sit amet egestas neque at mattis arcu eu dolor blandit.</p>
                                    <div className='social-links'>
                                        <Link to=""><img src="/images/facebook.svg" alt="facebook" /></Link>
                                        <Link to=""><img src="/images/insta.svg" alt="facebook" /></Link>
                                        <Link to=""><img src="/images/twitter.svg" alt="facebook" /></Link>
                                        <Link to=""><img src="/images/linkedin.svg" alt="facebook" /></Link>
                                    </div>
                                </div>
                                <div className='col-lg-3 clinicaltrial-ftr-col'>
                                    <h2>Clinical Trial Link</h2>
                                    <ul>
                                        <li><Link to="/">About Us</Link></li>
                                        <li><Link to="/">Ask the Expert</Link></li>
                                        <li><Link to="/">FAQ's</Link></li>
                                        <li><Link to="/">Contact Us</Link></li>
                                    </ul>
                                </div>
                                <div className='col-lg-3 clinicaltrial-ftr-col'>
                                    <h2>Legal</h2>
                                    <ul>
                                        <li><Link to="/">Privacy Policy</Link></li>
                                        <li><Link to="/">Terms & Conditions</Link></li>
                                        <li><Link to="/">Site Map</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 offset-lg-1 clinicaltrial-ftr-col'>
                            <h2>Subscribe</h2>
                            <p>Subscribe to get the latest News from Clinical Trial Link</p>
                            <div className="input-group">
                                <InputText type="text" FormGroupClass="mb-0" placeholder="Email Address" />
                                <div className="input-group-append">
                                    <button className="btn btn-green" type="button"><img src="/images/send-icon.svg" alt="icon" /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='copyright'><p>Copyright © 2022 <strong>Clinical Trial Link</strong>. All rights reserved.</p></div>
                </div>
            </footer>
        </>
    );
}


export default Footer;