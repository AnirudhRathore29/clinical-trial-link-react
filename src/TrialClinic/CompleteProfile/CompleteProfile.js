import { useState } from "react";
import { InputText, SelectBox } from "../../Components/Common/Inputs/Inputs";
import RadioBtn from "../../Components/Common/RadioBtn/RadioBtn";
import Button from "../../Components/Common/Buttons/Buttons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Pages/Login/Login.css";

const SignUp = () => {
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
    const [startDate, setStartDate] = useState(new Date());

    const CompleteProfileSubmit = () => {

    }

    return (
        <>
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
                                        name="zip_code"
                                        placeholder="Enter zip code"
                                        labelText="Zip Code"
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Date Of Birth</label>
                                    <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                                    </div>
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
                                        name="IFSC_code"
                                        placeholder="Enter IFSC Code"
                                        labelText="IFSC Code"
                                    />
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Trial Information</h2>
                                </div>
                                <div className="col-lg-4">
                                    <SelectBox
                                        name="seeking_trial_for"
                                        labelText="Seeking Trials for"
                                        optionData={
                                            <>
                                                <option value="">Select</option>
                                                <option value="">Option1</option>
                                                <option value="">Option2</option>
                                                <option value="">Option3</option>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <SelectBox
                                        name="health_condition"
                                        labelText="Mental Health Condition"
                                        optionData={
                                            <>
                                                <option value="">Select</option>
                                                <option value="">Option1</option>
                                                <option value="">Option2</option>
                                                <option value="">Option3</option>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>Trials for</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Myself" />
                                        <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Family/Friends" />
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Share Your Physician Details <small>(if any)</small></h2>
                                </div>
                                <div className="col-lg-4">
                                    <InputText
                                        type="text"
                                        name="name"
                                        placeholder="Enter Name"
                                        labelText="Name"
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <InputText
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        labelText="Email"
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <InputText
                                        type="number"
                                        name="phone_number"
                                        placeholder="Enter Phone Number"
                                        labelText="Phone Number"
                                    />
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

export default SignUp;
