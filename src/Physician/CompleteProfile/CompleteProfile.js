import React, {useState} from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import Header from "../../views/Components/FrontHeader/FrontHeader";
import DatePicker from "react-datepicker";
import { loginUser } from '../../app/actions/authAction'
import 'boxicons';
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import RadioBtn from "../../views/Components/Common/RadioBtn/RadioBtn";

const PhysicianCompleteProfile = (props) => {
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
        loginUser("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9")
        props.history.push('/physician/dashboard')
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
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <TextArea
                                        name="brief_intro"
                                        placeholder="Enter Brief Intro"
                                        labelText="Brief Intro"
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

export default PhysicianCompleteProfile;
