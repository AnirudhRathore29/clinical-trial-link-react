import { useState } from 'react';
import { InputText } from '../Inputs/Inputs';
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import { useDispatch } from "react-redux";
import CommonButton from '../Buttons/Buttons';
import { ContactApiData } from '../../../Redux/Action/AuthAction';
import './ContactForm.css';

const ContactForm = () => {
    const dispatch = useDispatch();

    const [contactFields, setContactFields] = useState({
        question: "",
        name: "",
        email: "",
        message: ""
    });

    const onSubmit = () =>{
        dispatch(ContactApiData({ contactFields }));
    }

    return (
        <>
            <div className="container">
                <form action name="contact form" className="ftr-contact-form">
                    <SectionTitle CustomClass="pad-b-50 text-center" title="Contact Us" ShapeImage="heading-clip-2.svg" />
                    <div className="row">
                        <div className="col-lg-4">
                            <InputText
                                type="text"
                                name="question"
                                value={contactFields.question}
                                placeholder="Ask a Question"
                                onChange={(e) => { setContactFields({ ...contactFields, question: e.target.value }) }
                                }
                            />
                        </div>
                        <div className="col-lg-4">
                            <InputText
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={(e) => { setContactFields({ ...contactFields, name: e.target.value }) }
                                }
                            />
                        </div>
                        <div className="col-lg-4">
                            <InputText
                                type="email"
                                name="email"
                                value={contactFields.email}
                                placeholder="Email"
                                onChange={(e) => { setContactFields({ ...contactFields, email: e.target.value }) }
                                }
                            />
                        </div>
                        <div className="col-lg-12">
                            <textarea
                                className="form-control"
                                name="message"
                                placeholder="Message...."
                                defaultValue={""}
                                onChange={(e) => { setContactFields({ ...contactFields, message: e.target.value }) }
                                }
                            />
                        </div>
                        <div className="col-12 text-center mt-4">
                            <CommonButton isButton="true" BtnType="button" BtnColor="green" BtnText="Submit" onClick={onSubmit} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ContactForm;