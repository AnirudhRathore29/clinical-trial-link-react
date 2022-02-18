import React from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import Header from "../../views/Components/FrontHeader/FrontHeader";
import { loginUser } from '../../app/actions/authAction'
import 'boxicons';
import "../../views/pages/Login/Login.css";

const ClinicCompleteProfile = (props) => {
    // const [Formdata, setFormdata] = useState({
    //     state: "",
    //     zip_code: "",
    //     date_of_birth: "",
    //     gender: "",
    //     bank_name: "",
    //     account_holder_name: "",
    //     account_holder_name: "",
    //     t_c: "",
    // });

    const CompleteProfileSubmit = () => {
        loginUser("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9")
        props.history.push('/patient/dashboard')
    }

    return (
        <>
            <Header colorHeader="colorHeader" />
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Complete Profile</h1>
                        <p>A few clicks away from Creating your account</p>
                    </div>
                    <div className="authentication-bx sign-up-authentication">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="sponsors_name"
                                        placeholder="Enter Sponsor Name"
                                        labelText="Sponsor Name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <SelectBox
                                        name="specialty"
                                        labelText="Specialty"
                                        optionData={
                                            <>
                                                <option value="">Select Specialty</option>
                                                <option value="">Specialty 1</option>
                                                <option value="">Specialty 2</option>
                                                <option value="">Specialty 3</option>
                                                <option value="">Specialty 4</option>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <SelectBox
                                        name="condition"
                                        labelText="Condition"
                                        optionData={
                                            <>
                                                <option value="">Select Condition</option>
                                                <option value="">Condition 1</option>
                                                <option value="">Condition 2</option>
                                                <option value="">Condition 3</option>
                                                <option value="">Condition 4</option>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <SelectBox
                                        name="state"
                                        labelText="State"
                                        optionData={
                                            <>
                                                <option value="">Select State</option>
                                                <option value="">Alabama</option>
                                                <option value="">Alaska</option>
                                                <option value="">Arizona</option>
                                                <option value="">Arkansas</option>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        labelText="Address"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="zip_code"
                                        placeholder="Enter zip code"
                                        labelText="Zip Code"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <TextArea
                                        name="brief_intro"
                                        placeholder="Enter Brief Intro"
                                        labelText="Brief Intro"
                                    />
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Add Bank Details</h2>
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="bank_name"
                                        placeholder="Enter Bank Name"
                                        labelText="Name of Bank"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_holder_name"
                                        placeholder="Enter Name"
                                        labelText="Account Holder Name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <div className='info-bx br-none p-0 mb-4'>
                                        <box-icon type='solid' name='info-circle' color="#4096EE" size="27px"></box-icon> Add your bank details for send payment to Trial Clinics.
                                    </div>
                                </div>

                                <div className="mt-5 text-center">
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="green w-50"
                                        BtnText="Finish"
                                        onClick={CompleteProfileSubmit}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ClinicCompleteProfile;