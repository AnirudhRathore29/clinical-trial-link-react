import React from 'react';
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import CommonButton from '../../Components/Common/Buttons/Buttons';
import './Home.css';

const Home = () => {
    
    return (
        <>
            <section className="home-banner-section">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-5 home-banner-caption">
                            <div className='news-bx'>
                                <span>News</span> Lorem ipsum dolor amet consectetur adipiscing elit.
                            </div>
                            <h1> Finding Clinical Trials for Patients </h1>
                            <p> Type the disease name for which you seek the clinical trials and hit the button to search. </p>
                            {/* <img src="/images/banner-form.svg" alt="banner-form" /> */}
                        </div>
                        <div className="col-lg-7">
                            <div className="home-banner-img text-end">
                                <img src="/images/home-banner-img.png" alt="Finding Clinical Trials for Patients" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="what-section pad-t-80 pad-b-80" id='aboutus'>
                <div className="container">
                    <SectionTitle CustomClass="text-center" title="What is Clinical Trial Link?" SubHeading={<p className="what-sec-text pad-t-30"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor aliquam, pulvinar augue at, dictum nibh.</p>} ShapeImage="heading-clip-1.svg" />
                    <div className="what-is-msingipack">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor aliquam, pulvinar augue at, dictum nibh. Curabitur vel lobortis eros. Nam eu sem lobortis, pretium erat sit amet, egestas neque. Ut mattis arcu eu dolor blandit, sit amet convallis lectus fringilla. Duis ante lorem, tincidunt eu commodo quis, condimentum ut sapien. Pellentesque vitae nulla felis. Integer scelerisque elit ac dui sollicitudin, sit amet lacinia leo euismod.</p>
                        <p>Quisque dignissim vitae sem sit amet convallis. Vivamus a aliquet odio. Vestibulum eu pretium nunc, vel vehicula sapien. Curabitur sed ornare neque. Maecenas vel sollicitudin velit. Ut ac ipsum sed metus euismod sagittis. Sed at fermentum erat, in ornare velit. Curabitur eleifend sed urna non fringilla. Cras purus tellus, rutrum eget est eget, sagittis pellentesque massa. Suspendisse molestie et sapien sed suscipit. Aenean aliquam eros et tellus finibus commodo.</p>
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