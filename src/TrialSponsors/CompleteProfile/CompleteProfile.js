import React, { useState, useEffect } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import Header from "../../views/Components/FrontHeader/FrontHeader";
import 'boxicons';
import "../../views/pages/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { StatesAction } from "../../redux/actions/commonAction";
import { useHistory } from "react-router-dom";
import { SponsorCompleteProfileAction } from "../../redux/actions/profileAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const ClinicCompleteProfile = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [profileInputData, setProfileInputData] = useState({
        sponsor_name: "",
        speciality: [],
        condition: [],
        state_id: "",
        zip_code: "",
        address: "",
        brief_intro: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setProfileInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }

    useEffect(() => {
        dispatch(StatesAction())
    }, [dispatch])


    useEffect(() => {
        if (CPSubmitClick === true) {
            if (Object.keys(profileComSelector.data).length !== 0 && profileComSelector.loading === false) {
                toast.success(profileComSelector.data.data.message, { theme: "colored" })
                history.push("/trial-sponsors/dashboard");
            } else if (Object.keys(profileComSelector.error).length !== 0 && profileComSelector.loading === false) {
                let err = profileComSelector.error.message;
                toast.error(err, { theme: "colored" });
                setCPSubmitClick(false)
            }
        }
    }, [CPSubmitClick, profileComSelector, history])

    const CompleteProfileSubmit = (e) => {
        e.preventDefault();
        let data = {
            state_id: profileInputData.state_id,
            zip_code: profileInputData.zip_code,
            dob: profileInputData.dob,
            gender: profileInputData.gender,
            brief_intro: profileInputData.brief_intro,
        }
        dispatch(SponsorCompleteProfileAction(data))
        setCPSubmitClick(true)
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
                                        name="state_id"
                                        required="required"
                                        onChange={onChange}
                                        labelText="State"
                                        optionData={
                                            <>
                                                <option value=""> Select State </option>
                                                {
                                                    Object.keys(dataSelector).length !== 0 && dataSelector.data.data.map((value, index) => {
                                                        return (
                                                            <option value={value.id} key={index}> {value.name} </option>
                                                        )
                                                    })
                                                }
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
