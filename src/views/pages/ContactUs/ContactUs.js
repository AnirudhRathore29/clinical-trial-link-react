import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactPageDetailAction } from "../../../redux/actions/cmsAction";
import Button from "../../Components/Common/Buttons/Buttons";
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import { InputText, TextArea } from "../../Components/Common/Inputs/Inputs";
import "./ContactUs.css";

const ContactUs = () => {

    const dispatch = useDispatch()

    const ContactPageDetailSelector = useSelector(state => state.cms_content.contact_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)
    const [Formdata, setFormData] = useState({
        email: "",
        password: "",
    });

    const ContactSubmit = () => {
    }

    console.log("ContactPageDetail", ContactPageDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);


    useEffect(() => {
        dispatch(ContactPageDetailAction())
    }, [])

    return (
        <>
            <InnerBanner
                pageTitle={ContactPageDetailSelector && ContactPageDetailSelector.data.cms_detail.title}
                subTitle={ContactPageDetailSelector && ContactPageDetailSelector.data.cms_detail.title_short_note}
            />

            <section className="repeat-section contact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 d-flex">
                            <div className="inquire-bx">
                                {
                                    ContactPageDetailSelector &&
                                    ContactPageDetailSelector.data.site_setting_detail.map((value, index) => {
                                        return (
                                            <div className="contact-bx">
                                                <h2>
                                                    {
                                                        value.slug === "contact_us_support_content" ? "Support" :
                                                        value.slug === "contact_us_sales_enquiry_content" ? "Sales Enquiries" :
                                                        value.slug === "site_email" ? "Contact" : null
                                                    }
                                                </h2>
                                                <p dangerouslySetInnerHTML={{ __html: value.value}} />
                                            </div>
                                        )
                                    })
                                }
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
