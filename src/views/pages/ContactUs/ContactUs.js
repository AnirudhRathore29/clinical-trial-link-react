import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactPageDetailAction } from "../../../redux/actions/cmsAction";
import Button from "../../Components/Common/Buttons/Buttons";
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import { InputText, TextArea } from "../../Components/Common/Inputs/Inputs";
import { LogoLoader } from "../../Components/Common/LogoLoader/LogoLoader";
import { toast } from "react-toastify";
import "./ContactUs.css";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const ContactUs = () => {
    const ContactPageDetailSelector = useSelector(state => state.cms_content.contact_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)
    const [Formdata, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        message: ''
    });
    const [Loader, setLoader] = useState(false);

    const dispatch = useDispatch()

    const onchange = (e) => {
        const { name, value } = e.target
        setFormData({...Formdata,  [name]: value})
    }

    console.log("Formdata", Formdata);
    console.log("ContactPageDetail", ContactPageDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);

    const ContactSubmit = () => {
        setLoader(true)
        const option = {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(Formdata)
        }
        fetch("http://admin.clinicaltriallink.org/api/contact-us-enquiry", option)
            .then(response => response.json())
            .then(response => {
                setLoader(false)
                if (response.status_code === 200) {
                    toast.success(response.message, { theme: "colored", autoClose: 5000})
                    setFormData({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone_number: '',
                        message: ''
                    })
                } else {
                    toast.error(response.message, { theme: "colored", autoClose: 5000})
                }
            })
            .catch((error) => {
                setLoader(false)
                console.log("error", error);
            })
    }

    useEffect(() => {
        dispatch(ContactPageDetailAction())
    }, [dispatch])

    return (
        <>
            {
                LoadingSelectorSelector ?
                    <div className='fullPageLoader'>
                        <LogoLoader />
                    </div>
                    :
                    ContactPageDetailSelector &&
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
                                                        <div className="contact-bx" key={index}>
                                                            <h2>
                                                                {
                                                                    value.slug === "contact_us_support_content" ? "Support" :
                                                                        value.slug === "contact_us_sales_enquiry_content" ? "Sales Enquiries" :
                                                                            value.slug === "site_email" ? "Contact" : null
                                                                }
                                                            </h2>
                                                            <p dangerouslySetInnerHTML={{ __html: value.value }} />
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
                                                        name="first_name"
                                                        value={Formdata.first_name}
                                                        placeholder="First Name"
                                                        labelText="First Name"
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="last_name"
                                                        value={Formdata.last_name}
                                                        placeholder="Last Name"
                                                        labelText="Last Name"
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="email"
                                                        name="email"
                                                        value={Formdata.email}
                                                        placeholder="Email Address"
                                                        labelText="Email"
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="number"
                                                        name="phone_number"
                                                        value={Formdata.phone_number}
                                                        placeholder="Phone Number"
                                                        labelText="Phone Number"
                                                        onChange={onchange}
                                                    />
                                                </div>
                                                <div className="col-lg-12">
                                                    <TextArea
                                                        placeholder="Your Message"
                                                        name="message"
                                                        value={Formdata.message}
                                                        onChange={onchange}
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
                                                hasSpinner={Loader}
                                                disabled={Loader}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
            }
        </>
    );
};

export default ContactUs;
