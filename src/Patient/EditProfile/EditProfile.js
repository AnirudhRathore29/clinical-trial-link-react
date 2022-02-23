import { useState } from "react";
import { InputText, SelectBox } from "../../views/Components/Common/Inputs/Inputs";
import RadioBtn from "../../views/Components/Common/RadioBtn/RadioBtn";
import Button from "../../views/Components/Common/Buttons/Buttons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";

const PatientEditProfile = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [trialFor, setTrialFor] = useState(true)
    const [Formdata, setFormdata] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        password: "",
        confirm_password: "",
        t_c: "",
    });

    const trialsFor = () => {
        setTrialFor(!trialFor);
    }

    /* Password show hide */
    const [Password, SetPassword] = useState(false);
    const [oldPassword, SetOldPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);

    const ShowPassword = () => {
        SetPassword(!Password);
    };
    const ShowOldPassword = () => {
        SetOldPassword(!oldPassword);
    };
    const ShowConfirmPassword = () => {
        SetConfirmPassword(!confirmPassword);
    };
    /* Password show hide */

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Edit Profile</h1>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="repeat-white-bx">
                                <form autoComplete="off">
                                    <h2 className="section-title">Personal Info</h2>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label className="update-profile-bx">
                                                <input type="file" />
                                                <img src="/images/avatar2.svg" alt="profile pic" />
                                                <span><box-icon type='solid' name='camera' color="#ffffff" size="18px"></box-icon></span>
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="text"
                                                name="first_name"
                                                placeholder="First Name"
                                                defaultValue="Amanda"
                                                labelText="First Name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="text"
                                                name="last_name"
                                                placeholder="Last Name"
                                                defaultValue="Smith"
                                                labelText="Last Name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="number"
                                                name="phone_no"
                                                defaultValue="+01 987 654 3210"
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
                                                        <option defaultValue="">Select State</option>
                                                        <option defaultValue="">Alabama</option>
                                                        <option defaultValue="">Alaska</option>
                                                        <option defaultValue="">Arizona</option>
                                                        <option defaultValue="">Arkansas</option>
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
                                    <h2 className="section-title mt-4">Other Info</h2>
                                    <div className="row">
                                        <div className="col-lg-12 form-group">
                                            <label>Trials for</label>
                                            <div className="gender-row w-50 mt-4">
                                                <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Myself" defaultChecked="true" onChange={trialsFor} />
                                                <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Family/Friends" onChange={trialsFor} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <SelectBox
                                                name="seeking_trial_for"
                                                labelText="Seeking Trials for"
                                                optionData={
                                                    <>
                                                        <option defaultValue="">Select</option>
                                                        <option defaultValue="">Option1</option>
                                                        <option defaultValue="">Option2</option>
                                                        <option defaultValue="">Option3</option>
                                                    </>
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <SelectBox
                                                name="health_condition"
                                                labelText="Mental Health Condition"
                                                optionData={
                                                    <>
                                                        <option defaultValue="">Select</option>
                                                        <option defaultValue="">Option1</option>
                                                        <option defaultValue="">Option2</option>
                                                        <option defaultValue="">Option3</option>
                                                    </>
                                                }
                                            />
                                        </div>
                                    </div>
                                    {
                                        trialFor
                                            ?
                                            <>
                                                <h2 className="section-title mt-4">Your Primary Physician Details</h2>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <InputText
                                                            type="text"
                                                            name="first_name"
                                                            placeholder="First Name"
                                                            defaultValue="Amanda"
                                                            labelText="First Name"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <InputText
                                                            type="text"
                                                            name="last_name"
                                                            placeholder="Last Name"
                                                            defaultValue="Smith"
                                                            labelText="Last Name"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <InputText
                                                            type="number"
                                                            name="phone_no"
                                                            defaultValue="+01 987 654 3210"
                                                            placeholder="Phone Number"
                                                            labelText="Phone Number"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className='info-bx br-none'>
                                                            <box-icon type='solid' name='info-circle' color="#4096EE" size="22px"></box-icon> Optional for your Physician to Receive Notifications About your Participation in a Clinical Trial.
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            null
                                    }
                                    <h2 className="section-title mt-4">Bank Details</h2>
                                    <div className="row">
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
                                    </div>
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="primary"
                                        BtnText="Save"
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="repeat-white-bx">
                                <h2 className="section-title">Change Password</h2>
                                <form action="">
                                    <InputText
                                        type={oldPassword ? "text" : "password"}
                                        name="password"
                                        value={Formdata.oldPassword}
                                        placeholder="Enter old password"
                                        labelText="Old Password"
                                        className="password-field"
                                        onChange={(e) => {
                                            setFormdata({ ...Formdata, oldPassword: e.target.value });
                                        }}
                                        isPassword="true"
                                        onClick={ShowOldPassword}
                                        ChangeClass={oldPassword ? "show-hide active" : "show-hide"}
                                    />
                                    <InputText
                                        type={Password ? "text" : "password"}
                                        name="password"
                                        value={Formdata.password}
                                        placeholder="Enter New Password"
                                        labelText="New Password"
                                        className="password-field"
                                        onChange={(e) => {
                                            setFormdata({ ...Formdata, password: e.target.value });
                                        }}
                                        isPassword="true"
                                        onClick={ShowPassword}
                                        ChangeClass={Password ? "show-hide active" : "show-hide"}
                                    />
                                    <InputText
                                        type={confirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        value={Formdata.confirm_password}
                                        placeholder="Confirm Password"
                                        labelText="Confirm Password"
                                        className="password-field"
                                        onChange={(e) => {
                                            setFormdata({
                                                ...Formdata,
                                                confirm_password: e.target.value,
                                            });
                                        }}
                                        isPassword="true"
                                        onClick={ShowConfirmPassword}
                                        ChangeClass={
                                            confirmPassword ? "show-hide active" : "show-hide"
                                        }
                                    />
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="primary w-100"
                                        BtnText="Save"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientEditProfile;
