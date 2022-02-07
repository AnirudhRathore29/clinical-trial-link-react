import { useState } from "react";
import { InputText, SelectBox } from "../../views/components/Common/Inputs/Inputs";
import RadioBtn from "../../views/components/Common/RadioBtn/RadioBtn";
import Button from "../../views/components/Common/Buttons/Buttons"
import DatePicker from "react-datepicker";
// import { Tabs, Tab } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";

const PatientEditProfile = (props) => {
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

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Edit Profile</h1>
                        <Button
                            isButton="true"
                            BtnType="submit"
                            BtnColor="green"
                            BtnText="Save"
                        />
                    </div>

                    <div className="repeat-white-bx">
                        <div className="container-smallx">
                            <form autoComplete="off">
                                {/* <Tabs defaultActiveKey="personal-info" className="common-tabs" id="profile-tabs">
                                    <Tab eventKey="personal-info" title="Personal Info">
                                    </Tab>
                                    <Tab eventKey="other-info" title="Other Info">
                                        asd
                                    </Tab>
                                </Tabs> */}
                                <div className="row gutter-size-30">
                                    <div className="col-lg-6">
                                        <h2 className="section-title">Personal Info</h2>
                                        <div className="row">
                                            <div className="col-lg-12 form-group">

                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    value="Amanda"
                                                    labelText="First Name"
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="last_name"
                                                    placeholder="Last Name"
                                                    value="Smith"
                                                    labelText="Last Name"
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="number"
                                                    name="phone_no"
                                                    value="+01 987 654 3210"
                                                    placeholder="Phone Number"
                                                    labelText="Phone Number"
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
                                        </div>
                                    </div>
                                    <div className="col-lg-6 border-left1px">
                                        <h2 className="section-title">Other Info</h2>
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Trials for</label>
                                                <div className="gender-row mt-4">
                                                    <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Myself" defaultChecked="true" />
                                                    <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Family/Friends" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
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
                                            <div className="col-lg-12">
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
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientEditProfile;
