import { Link } from "react-router-dom";
import Banner from "../../Components/Common/Banner/Banner";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import './GettingStarted.css';

const GettingStarted = () => {
    return (
        <>
            <Banner BannerHeading="Getting Started" BannerSubHeading={<p>Follow the Instructions</p>} />
            <section className="getstarted-section pad-t-80 pad-b-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 1</h4>} title="Create Account" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Please <Link to="/sign-up">Sign up</Link> to create your Entity Sports Account in a minute.</p>} />
                        </div>
                        <div className="col-lg-6 text-end">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Create Account" />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-last">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 2</h4>} title="Verify Your Email" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Please check your email inbox and verify your email address.</p>} />
                        </div>
                        <div className="col-lg-6">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Verify Your Email" />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 3</h4>} title="Login At Dashboard" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Please log in at the dashboard.</p>} />
                        </div>
                        <div className="col-lg-6 text-end">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Verify Your Email" />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-last">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 4</h4>} title="Go To Plans" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Please go to plans section on the dashboard and click on subscribe button of the plan you like to use. Check below image for reference.</p>} />
                        </div>
                        <div className="col-lg-6">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Verify Your Email" />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 5</h4>} title="Process the payment to subscribe" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Process the payment using a credit card.</p>} />
                        </div>
                        <div className="col-lg-6 text-end">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Verify Your Email" />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-last">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 6</h4>} title="Application To Get API Key Details" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Please go to the Application section to get API access details. Please check below images for reference.</p>} />
                        </div>
                        <div className="col-lg-6">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Verify Your Email" />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <SectionTitle StepCount={<h4 className="mt-0">STEP 7</h4>} title="Follow the instruction on the documentation" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text pad-t-30">Please follow the instruction on API documentation for integrating the API.</p>} />
                        </div>
                        <div className="col-lg-6 text-end">
                            <div className="getting-started-img">
                                <img src="/images/sign-up.jpg" alt="Verify Your Email" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default GettingStarted;