import React, { useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import Header from "../../views/Components/FrontHeader/FrontHeader";
// import { loginUser } from '../../redux/actions/authAction'
import 'boxicons';
import "../../views/pages/Login/Login.css";
import { useDispatch } from "react-redux";
import { TrialClinicCompleteProfileAction } from "../../redux/actions/profileAction";

const ClinicCompleteProfile = (props) => {
    const dispatch = useDispatch();
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [profileInputData, setProfileInputData] = useState({
        clinic_name: "",
        speciality: [],
        condition: [],
        state_id: "",
        address: "",
        zip_code: "",
        principal_investigator_name: "",
        principal_investigator_email: "",
        principal_investigator_brief_intro: "",
        documents: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: ""
    });

    const totalFiles = 10;
    const [uploadedFileURLs, setUploadedFileURLs] = useState([]);

    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files?.length > 0 && files?.length <= totalFiles) {
            for (let i = 0; i < files.length; i++) {
                const { name, type } = files[i];

                const fileParams = {
                    key: name.includes('.') ? name.substring(0, name.indexOf('.')) : name,
                    extension: type.includes('/') ? type.substring(type.indexOf('/') + 1) : type
                };

                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.addEventListener('load', (e) => {
                    const data = e.target.result;
                    uploadedFileURLs.push({
                        url: data,
                        file_type: fileParams.extension,
                        file_name: files[i].name
                    })
                    setUploadedFileURLs(uploadedFileURLs);
                    console.log("uploadedFileURLs", uploadedFileURLs)
                })
                // console.log("fileParams", fileParams)
                // console.log("files[i]", files[i])
            }
        }
        // console.log("files", files)
    }

    const CompleteProfileSubmit = (e) => {
        e.preventDefault();
        let data = {
            clinic_name: profileInputData.clinic_name,
            speciality: "",
            condition: "",
            state_id: profileInputData.state_id,
            address: "",
            zip_code: "",
            principal_investigator_name: "",
            principal_investigator_email: "",
            principal_investigator_brief_intro: "",
            documents: "",
            bank_name: "",
            account_holder_name: "",
            account_number: "",
            routing_number: ""
        }
        dispatch(TrialClinicCompleteProfileAction(data))
        setCPSubmitClick(true)

        // props.history.push('/trial-clinic/dashboard')
    }

    return (
        <>
            <Header className="innerPageHeader" />
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
                                        name="clinic_name"
                                        placeholder="Enter Clinic Name"
                                        labelText="Clinic Name"
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
                                <div className="col-lg-4">
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
                                <div className="col-lg-4">
                                    <InputText
                                        type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        labelText="Address"
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <InputText
                                        type="text"
                                        name="zip_code"
                                        placeholder="Enter zip code"
                                        labelText="Zip Code"
                                    />
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Share Principal Investigator Details</h2>
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="name"
                                        name="text"
                                        placeholder="Enter Name"
                                        labelText="Name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        labelText="Email"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <TextArea
                                        name="brief_intro"
                                        placeholder="Enter Brief Intro"
                                        labelText="Brief Intro"
                                    />
                                </div>
                                <div className="col-lg-12 form-group">
                                    <label>Upload Clinic Document</label>
                                    <label className="upload-document">
                                        <input type="file" name="documents" multiple onChange={handleFileUpload} />
                                        <div>
                                            <h4>No File Uploaded</h4>
                                            <h3>Tap Here to Upload your File</h3>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Receive Payments from Sponsors/CRO</h2>
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
                                        <box-icon type='solid' name='info-circle' color="#4096EE" size="27px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
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
