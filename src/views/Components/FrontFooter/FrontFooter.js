import SectionTitle from "../Common/SectionTitle/SectionTitle";
import { InputText } from '../Common/Inputs/Inputs';
import { Link } from 'react-router-dom';
import './FrontFooter.css';
import { useDispatch, useSelector } from "react-redux";
import { FooterDetailAction } from "../../../redux/actions/cmsAction";
import { useEffect } from "react";
import { authHeader } from "../../../redux/actions/authHeader";
import getCurrentHost from "../../../redux/constants";
import { toast } from "react-toastify";
import 'boxicons';
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

// toast.configure();

const Footer = () => {
    const dispatch = useDispatch()
    const date = new Date()

    const FooterDetailSelector = useSelector(state => state.cms_content.footer_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)
    
    const [email, setEmail] = useState()
    const [Loading, setLoading] = useState(false)

    console.log("FooterDetail", FooterDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);

    const Subscribe = (e) => {
        e.preventDefault()
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: authHeader(true),
            body: JSON.stringify({
                subscriber_email: email
            })
        };
        return fetch(getCurrentHost() + "/save-subscriber", requestOptions)
            .then(data => data.json())
            .then((response) => {
                if(response?.status){
                    toast.success(response.message, { theme: "colored", autoClose: 5000})
                } else {
                    toast.error(response.message, { theme: "colored", autoClose: 5000})
                }
                setLoading(false)
                setEmail("")
            })
            .catch(err => {
                setLoading(false)
                setEmail("")
                toast.error(err.response.message, { theme: "colored", autoClose: 5000})
            })

    }

    useEffect(() => {
        dispatch(FooterDetailAction())
    }, [])
    return (
        <>
            <footer className='clinicaltrial-ftr'>
                <div className='download-app-bx'>
                    <div className='row align-items-center'>
                        <div className='col-lg-5'>
                            <img src={FooterDetailSelector && FooterDetailSelector.data.footer_banner_image ? FooterDetailSelector.data.footer_banner_image : "/images/download-app-img.png"} alt="download-app" />
                        </div>
                        <div className='col-lg-7'>
                            <div className="sec-title whiteTxt">
                                <h2 className="h2"> {FooterDetailSelector && FooterDetailSelector.data.footer_banner_title} </h2>
                                <img src="/images/heading-clip-1.svg" alt="shape vector" />
                                <p className="what-sec-text pad-t-30">{FooterDetailSelector && FooterDetailSelector.data.footer_banner_content}</p>
                            </div>
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
                                    <p>{FooterDetailSelector && FooterDetailSelector.data.footer_content}</p>
                                    <div className='social-links'>
                                        <a href={FooterDetailSelector && FooterDetailSelector.data.facebook_url} target="_blank"><img src="/images/facebook.svg" alt="facebook" /></a>
                                        <a href={FooterDetailSelector && FooterDetailSelector.data.instagram_url} target="_blank"><img src="/images/insta.svg" alt="facebook" /></a>
                                        <a href={FooterDetailSelector && FooterDetailSelector.data.twitter_url} target="_blank"><img src="/images/twitter.svg" alt="facebook" /></a>
                                        <a href={FooterDetailSelector && FooterDetailSelector.data.linkedin_url} target="_blank"><img src="/images/linkedin.svg" alt="facebook" /></a>
                                    </div>
                                </div>
                                <div className='col-lg-3 clinicaltrial-ftr-col'>
                                    <h2>Clinical Trial Link</h2>
                                    <ul>
                                        <li><Link to="/about-us">About Us</Link></li>
                                        <li><Link to="/faq">FAQ's</Link></li>
                                        <li><Link to="/contact-us">Contact Us</Link></li>
                                    </ul>
                                </div>
                                <div className='col-lg-3 clinicaltrial-ftr-col'>
                                    <h2>Legal</h2>
                                    <ul>
                                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                        <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 offset-lg-1 clinicaltrial-ftr-col'>
                            <h2>Subscribe</h2>
                            <p>Subscribe to get the latest News from Clinical Trial Link</p>
                            <form className="input-group" onSubmit={Subscribe}>
                                <InputText type="text" FormGroupClass="mb-0" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
                                <div className="input-group-append">
                                    <button className="btn btn-green" type="submit">
                                        {
                                            Loading ?
                                            <box-icon name='loader-alt' animation='spin' color="#356aa0" size="30px"></box-icon>
                                            :
                                            <img src="/images/send-icon.svg" alt="icon" />
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='copyright'><p>Copyright © {date?.getFullYear()} <strong>Clinical Trial Link</strong>. All rights reserved.</p></div>
                </div>
            </footer>
        </>
    );
}


export default Footer;