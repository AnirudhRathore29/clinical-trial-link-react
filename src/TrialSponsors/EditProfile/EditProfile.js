import { useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";

const SponsorsEditProfile = () => {
    const [Formdata, setFormdata] = useState({
        password: "",
        confirm_password: "",
    });

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
                                                name="sponsor_name"
                                                placeholder="Enter Sponsor Name"
                                                defaultValue="ABF Pharmaceutical"
                                                labelText="Sponsor Name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="number"
                                                name="phone_no"
                                                defaultValue="+01 987 654 3210"
                                                placeholder="Enter Phone Number"
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
                                                name="address"
                                                placeholder="Enter Address"
                                                defaultValue="Adolescents with ADHD"
                                                labelText="Address"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="text"
                                                name="zip_code"
                                                placeholder="Enter zip code"
                                                defaultValue="302013"
                                                labelText="Zip Code"
                                            />
                                        </div>
                                    </div>
                                    <h2 className="section-title mt-4">Other Info</h2>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <SelectBox
                                                name="specialty"
                                                labelText="Specialty"
                                                optionData={
                                                    <>
                                                        <option defaultValue="">Select Specialty</option>
                                                        <option defaultValue="">Specialty 1</option>
                                                        <option defaultValue="">Specialty 2</option>
                                                        <option defaultValue="">Specialty 3</option>
                                                    </>
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <SelectBox
                                                name="health_condition"
                                                labelText="Condition"
                                                optionData={
                                                    <>
                                                        <option defaultValue="">Select Condition</option>
                                                        <option defaultValue="">Condition 1</option>
                                                        <option defaultValue="">Condition 2</option>
                                                        <option defaultValue="">Condition 3</option>
                                                    </>
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <TextArea
                                                labelText="Brief Intro"
                                                placeholder="Enter Brief Intro"
                                                defaultData="Lorem ipsum dolor sit amet, consecte adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagitt. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae tincid urna sagittis ullamcorper ut congue elit. Etiam placerat turpis ligula, et lacinia nisl porttitor sed."
                                            />
                                        </div>
                                    </div>
                                    <h2 className="section-title mt-4">Bank Details <small>(Optional)</small> </h2>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorsEditProfile;
