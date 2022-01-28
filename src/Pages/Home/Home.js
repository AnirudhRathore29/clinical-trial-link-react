import React from 'react';
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import CommonButton from '../../Components/Common/Buttons/Buttons';
import './Home.css';
import '../../Components/Plans/Plans.css'
import '../../Components/Common/Banner/Banner.css';

const Home = () => {
    
    return (
        <>
            <section className="hero-section">
                <div className="banner-bg">
                    <img src="/images/banner-top-vector.svg" alt="banner-vectors" />
                </div>
                <div className="banner-btm-bg">
                    <img src="/images/banner-btm-vector.svg" alt="banner-vectors" />
                </div>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="hero-caption">
                                <div className="hero-heading">
                                    <h1 className="h1"> Easy access to KICD approved interactive learning content. </h1>
                                </div>
                                <p> Large savings on learning and exam revision material through an integrated data API solution. </p>
                                <CommonButton isLink="true" URL="/" BtnColor="green" BtnText="Get Started"/>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img text-end">
                                <img src="/images/msingi-pac.png" alt="Easy access to KICD approved interactive learning content" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="what-section pad-t-80 pad-b-80" id='aboutus'>
                <div className="container">
                    <SectionTitle CustomClass="text-center" title="What is MsingiPACK Cloud?" ShapeImage="heading-clip-1.svg" />
                    <div className="what-is-msingipack">
                        <p><strong>The MsingiPACK Cloud platform is a Content as a service or managed content as a service (MCaaS) which delivers curriculum aligned content on demand to users anywhere at any time. </strong></p>
                        <p>MsingiPACK Cloud enables users to access quality digital content that has been aligned to both Competency Based Curriculum (CBC) as well as the current 8-4-4 curriculum easily through an API. </p>
                        <p>The platform allows integration of any platform such as Mobile apps, Desktop apps, Learning Management System (LMS), etc to consume and make use of the content according to their needs by offering flexible and affordable plans. This is ideal for schools, digital publishers, companies or individuals offering digital learning solutions. </p>
                        <p>MsingiPACK Cloud platform not only offers quality digital content but also approved content by Kenya Institute of Curriculum Development (KICD). </p>
                    </div>
                </div>
            </section>

            <section className="process-section pad-t-80 pad-b-80">
                <div className="container">
                    <div className="sec-title text-center pad-b-50">
                        <SectionTitle CustomClass="text-center" title="Easy steps to subscribe" ShapeImage="heading-clip-1.svg" />
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="process-item text-center">
                                <div className="process-icon">
                                    <img src="/images/register-process.svg" alt="Sign up/Register" />
                                </div>
                                <div className="process-text">
                                    <span> Step 1 </span>
                                    <h3> Sign up/Register </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="process-item text-center">
                                <div className="process-icon">
                                    <img src="/images/conent-plan-process.svg" alt="Choose a content plan" />
                                </div>
                                <div className="process-text">
                                    <span> Step 2 </span>
                                    <h3> Choose a content plan </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="process-item text-center">
                                <div className="process-icon">
                                    <img src="/images/make-payment-process.svg" alt="Make a payment" />
                                </div>
                                <div className="process-text">
                                    <span> Step 3 </span>
                                    <h3> Make a payment </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="process-item text-center">
                                <div className="process-icon">
                                    <img src="/images/integrate-process.svg" alt="Integrate & Access Content" />
                                </div>
                                <div className="process-text">
                                    <span> Step 4 </span>
                                    <h3> Integrate &amp; Access Content </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pad-t-80 align-items-center">
                        <div className="col-lg-5">
                            <SectionTitle title="Sneak Peak" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text mx-0 pad-t-30"> Access approved quality digital content easily and flexible through data API solution.</p>} />
                        </div>
                        <div className="col-lg-6 offset-lg-1 sneak-peak-img">
                            <img src="/images/sneak-peak.svg" alt="Sneak Peak" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="ready-to-start pad-t-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 ready-to-start-img">
                            <img src="/images/ready-to-start.png" alt="Ready to start" />
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <SectionTitle title="Ready to start?" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text mx-0 pad-t-30">Access digital content across multiple channels and interact with learning content in new ways</p>} SubHeading2={<h4>Create your MsingiPAC Cloud <br /> account today!</h4>} HeadingBtn={<CommonButton isLink="true" URL="/sign-up" BtnColor="green" BtnText="Subscribe"/>} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="our-plans pad-t-50 pad-b-50" id="content-plans">
                {/* <div className="child-image-bx">
                    <div className="container">
                        <img src="/images/childrens-img.png" alt="Our Content Plans" />
                    </div>
                </div> */}
                <div className="container">
                    <SectionTitle CustomClass="pad-b-50 text-center" title="Our Content Plans" ShapeImage="heading-clip-1.svg" />
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="plan-detail-bx light-bg-orange">
                                <h2>Bronze</h2>
                                <ul>
                                    <li>Minimum of 1 subject per class/grade to be selected from the available levels.</li>
                                    <li>Monthly, Termly or Yearly option available.</li>
                                    <li>Account holders/subscribers can add more subjects to their accounts.</li>
                                </ul>
                                <div className="text-center">
                                    <CommonButton isLink="true" URL="/pricing" BtnColor="white" BtnText="Go"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="plan-detail-bx light-bg-purple highlighted-plan">
                                <h2>Silver</h2>
                                <ul>
                                    <li>Minimum of 1 Grade/Class level to be selected from the available levels.</li>
                                    <li>Monthly, Termly or Yearly option available.</li>
                                    <li>Account holders/subscribers can add more subjects to their accounts</li>
                                </ul>
                                <div className="text-center">
                                    <CommonButton isLink="true" URL="/pricing" BtnColor="white" BtnText="Go"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="plan-detail-bx light-bg-green">
                                <h2>Gold</h2>
                                <ul>
                                    <li>Subscribe to access all classes/grade levels available.</li>
                                    <li>Monthly, Termly or Yearly option available</li>
                                    <li>Account holders/subscribers can add more subjects to their accounts.</li>
                                </ul>
                                <div className="text-center">
                                    <CommonButton isLink="true" URL="/pricing" BtnColor="white" BtnText="Go"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="why-choose-msingipack pad-t-50 pad-b-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="sec-title pad-b-50">
                                <h2 className="h2"> Why Use MsingiPACK <br /> Cloud </h2>
                                <img src="/images/heading-clip-2.svg" alt="" />
                            </div>
                            <ul className="why-choose-points">
                                <li count="01">
                                    <h2>Always Live</h2>
                                    <p>We are always live covering the live score for multiple events across various sports.</p>
                                </li>
                                <li count="02">
                                    <h2>24 / 7 Support</h2>
                                    <p>Always available to help, you can reach us via email and phone. All queries will be answered quickly.</p>
                                </li>
                                <li count="03">
                                    <h2>Best Features</h2>
                                    <p>Player, Team, Competitions stats, Fantasy points, Fast live score features available for multiple sports.</p>
                                </li>
                                <li count="04">
                                    <h2>Affordable Pricing</h2>
                                    <p>Multiple affordable plans for each sport, select the ideal plan as per the requirements.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6 why-choose-msingipack-img">
                            <img src="/images/why-use-msingpack.png" alt="Why Use MsingiPACK Cloud" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;