import { useState } from "react";
import Button from "../../Components/Common/Buttons/Buttons";
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import { InputText, TextArea } from "../../Components/Common/Inputs/Inputs";
import "./ContactUs.css";

const ContactUs = () => {
    const [Formdata, setFormData] = useState({
        email: "",
        password: "",
    });

    const ContactSubmit = () => {
    }

    return (
        <>
            <InnerBanner
                pageTitle="Contact Us"
                subTitle={<>Feel free to contact us and we will get back <br /> to you soon as we can.</>}
            />

            <section className="repeat-section contact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 d-flex">
                            <div className="inquire-bx">
                                <div className="contact-bx">
                                    <h2>Support</h2>
                                    <p>React us at  <a href="mailto:support@clinicaltriallink.com">support@clinicaltriallink.com</a> and we will get back to you asap</p>
                                </div>
                                <div className="contact-bx">
                                    <h2>Sales Enquiries</h2>
                                    <p>Send us an email at <a href="mailto:sales@clinicaltriallink.com">sales@clinicaltriallink.com</a></p>
                                </div>
                                <div className="contact-bx">
                                    <h2>Contact</h2>
                                    <p>Contact us at  <a href="mailto:contact@clinicaltriallink.com">contact@clinicaltriallink.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1 contact-from-bx d-flex">
                            <div>
                                <h2>Get in Touch.</h2>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <InputText
                                            type="text"
                                            name="name"
                                            value={Formdata.first_name}
                                            placeholder="Full Name"
                                            labelText="First Name"
                                            onChange={(e) => {
                                                setFormData({ ...Formdata, first_name: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <InputText
                                            type="text"
                                            name="last_name"
                                            value={Formdata.last_name}
                                            placeholder="Last Name"
                                            labelText="Last Name"
                                            onChange={(e) => {
                                                setFormData({ ...Formdata, last_name: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <InputText
                                            type="email"
                                            name="email"
                                            value={Formdata.email}
                                            placeholder="Email Address"
                                            labelText="Email"
                                            onChange={(e) => {
                                                setFormData({ ...Formdata, email: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <InputText
                                            type="number"
                                            name="phone_no"
                                            value={Formdata.phone_no}
                                            placeholder="Phone Number"
                                            labelText="Phone Number"
                                            onChange={(e) => {
                                                setFormData({ ...Formdata, phone_no: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <TextArea
                                            placeholder="Your Message"
                                            labelText="Enter your Message"
                                        />
                                    </div>
                                </div>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Submit your Message"
                                    onClick={ContactSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;
