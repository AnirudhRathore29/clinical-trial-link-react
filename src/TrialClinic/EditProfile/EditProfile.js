import { useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "../../views/Components/Common/Buttons/Buttons"
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";

const ClinicEditProfile = () => {
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

    const [shareSetting, setShareSetting] = useState(false)
    const ShareSetting = () => {
        setShareSetting(!shareSetting);
    }
    
    const [shareSetting2, setShareSetting2] = useState(false)
    const ShareSetting2 = () => {
        setShareSetting2(!shareSetting2);
    }

    const renderTooltip = (props) => (
        <Tooltip {...props}> Optional to share Principal Investigator Details with the sponsor </Tooltip>
      );
    const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}> Optional to receive payments from the sponsor directly through the application </Tooltip>
      );

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
                                                name="clinic_name"
                                                placeholder="Enter Clinic Name"
                                                defaultValue="UC Health"
                                                labelText="Clinic Name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="number"
                                                name="phone_number"
                                                placeholder="Enter Phone Number"
                                                defaultValue="+01 987 654 3210"
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
                                    </div>
                                    <h2 className="section-title mt-4">Other Info</h2>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <SelectBox
                                                name="clinical_practice"
                                                labelText="Clinical Practice"
                                                optionData={
                                                    <>
                                                        <option defaultValue="">Select Clinical Practice</option>
                                                        <option defaultValue="">Cardiology</option>
                                                        <option defaultValue="">Option2</option>
                                                        <option defaultValue="">Option3</option>
                                                    </>
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <SelectBox
                                                name="Condition"
                                                labelText="Condition"
                                                optionData={
                                                    <>
                                                        <option defaultValue="">Select Condition</option>
                                                        <option defaultValue="">Opioid Use Disorder</option>
                                                        <option defaultValue="">Option2</option>
                                                        <option defaultValue="">Option3</option>
                                                    </>
                                                }
                                            />
                                        </div>
                                    </div>
                                    <h2 className="section-title mt-4 with-btn"><span>Share Principal Investigator Details <small>(Optional)</small></span>
                                        <span className="d-flex align-items-center">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={renderTooltip}
                                            >
                                                <button className="info-btn"><box-icon type='solid' name='info-circle' color="#4096EE"></box-icon></button>
                                            </OverlayTrigger>
                                            <label className="switch">
                                                <input type="checkbox" onChange={ShareSetting} />
                                                <span className="slider round"></span>
                                            </label>
                                        </span>
                                    </h2>
                                    <div className={shareSetting ? "sharing-disable row" : "row"}>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="text"
                                                name="investigator_name"
                                                placeholder="Enter Name"
                                                defaultValue="Dr Aikenhead"
                                                labelText="Name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="email"
                                                name="last_name"
                                                placeholder="Enter email"
                                                defaultValue="dr_aikenhead@gmail.com"
                                                labelText="Email"
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <TextArea
                                                placeholder="Enter Brief Intro"
                                                labelText="Brief Intro"
                                                defaultData="Lorem ipsum dolor sit amet, consecte adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagitt. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius."
                                            />
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <label>Upload any Relevant Documents to the Sponsor</label>
                                            <label className="upload-document">
                                                <input type="file" />
                                                <div>
                                                    <h4>File Name Here.pdf</h4>
                                                    <h3>Tap Here to Upload your new File</h3>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <h2 className="section-title mt-4 with-btn"><span>Bank Details <small>(Optional)</small></span>
                                        <span className="d-flex align-items-center">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={renderTooltip2}
                                            >
                                                <button className="info-btn"><box-icon type='solid' name='info-circle' color="#4096EE"></box-icon></button>
                                            </OverlayTrigger>
                                            <label className="switch">
                                                <input type="checkbox" onChange={ShareSetting2} />
                                                <span className="slider round"></span>
                                            </label>
                                        </span>
                                    </h2>
                                    <div className={shareSetting2 ? "sharing-disable row" : "row"}>
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
                                            <div className='info-bx br-none p-0 mb-5'>
                                                <box-icon type='solid' name='info-circle' color="#4096EE" size="22px"></box-icon> Receive payments from the sponsor 
                                            </div>
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
                                    defaultValue={Formdata.oldPassword}
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
                                    defaultValue={Formdata.password}
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
                                    defaultValue={Formdata.confirm_password}
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

export default ClinicEditProfile;
