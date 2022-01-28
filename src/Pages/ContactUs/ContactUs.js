import Banner from "../../Components/Common/Banner/Banner";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import './ContactUs.css';

const ContactUs = () => {
    return (
        <>
            <Banner BannerHeading="Contact Us" BannerSubHeading={<p>Request free trial/Ask a question</p>} />
            <section className="what-section pad-t-80 pad-b-80">
                <div className="container">
                    <SectionTitle CustomClass="text-center pad-b-50" title="Get in Touch" ShapeImage="heading-clip-1.svg" />
                    <div className="row">
                        <div className="col-lg-4">
                            <a href="mailto:support@msingipack.com" className="getInTouch-bx light-bg-orange">
                                <img src="/images/email.svg" alt="Support" />
                                <h2>Support</h2>
                                <p>support@msingipack.com</p>
                            </a>
                        </div>
                        <div className="col-lg-4">
                            <a href="mailto:support@msingipack.com" className="getInTouch-bx light-bg-purple">
                                <img src="/images/email.svg" alt="Support" />
                                <h2>Sales Enquiries</h2>
                                <p>sales@msingipack.com</p>
                            </a>
                        </div>
                        <div className="col-lg-4">
                            <a href="tel:+254 111044 600" className="getInTouch-bx light-bg-green">
                                <img src="/images/phone.svg" alt="Contact" />
                                <h2>Contact</h2>
                                <p>+254 111044 600</p>
                            </a>
                        </div>
                    </div>`
                </div>
            </section>
        </>
    );
}

export default ContactUs;