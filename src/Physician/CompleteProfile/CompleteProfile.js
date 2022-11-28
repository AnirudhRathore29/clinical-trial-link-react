import React, { useState, useEffect } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import Header from "../../views/Components/FrontHeader/FrontHeader";
import DatePicker from "react-datepicker";
import 'boxicons';
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import RadioBtn from "../../views/Components/Common/RadioBtn/RadioBtn";
import { useDispatch, useSelector } from "react-redux";
import { StatesAction } from "../../redux/actions/commonAction";
import { useHistory } from "react-router-dom";
import { PhysicianCompleteProfileAction } from "../../redux/actions/profileAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidZipcode } from "./../../views/Components/Validation/Validation"

toast.configure();
var jwt = require('jsonwebtoken');
const PhysicianCompleteProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [profileInputData, setProfileInputData] = useState({
        state_id: "",
        zip_code: "",
        dob: null,
        gender: "M",
        brief_intro: ""
    });

    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

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
        if (profileDetails.isProfileCompleted) {
            history.push('/physician/dashboard');
        }
    }, [profileDetails, history]);

    useEffect(() => {
        dispatch(StatesAction())
    }, [dispatch])

    useEffect(() => {
        if (CPSubmitClick === true) {
            if (Object.keys(profileComSelector.data).length !== 0 && profileComSelector.loading === false) {
                toast.success(profileComSelector.data.data.message, { theme: "colored" })
                history.push("/physician/dashboard");
            } else if (Object.keys(profileComSelector.error).length !== 0 && profileComSelector.loading === false) {
                let err = profileComSelector.error.message;
                toast.error(err, { theme: "colored" });
                setCPSubmitClick(false)
            }
        }
    }, [CPSubmitClick, profileComSelector, history])

    const Vaildation = (value) => {
        const isZipcodeVaild = isValidZipcode(value.zip_code)
        if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored" })
            return false
        }
        return true
    }

    const CompleteProfileSubmit = (e) => {
        e.preventDefault();
        let data = {
            state_id: profileInputData.state_id,
            zip_code: profileInputData.zip_code,
            dob: profileInputData.dob,
            gender: profileInputData.gender,
            brief_intro: profileInputData.brief_intro,
        }
        const isVaild = Vaildation(data)
        if (isVaild) {
            dispatch(PhysicianCompleteProfileAction(data))
            setCPSubmitClick(true)
        }
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
                        <form autoComplete="off" onSubmit={CompleteProfileSubmit}>
                            <div className="row">
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
                                        name="zip_code"
                                        placeholder="Enter zip code"
                                        labelText="Zip Code"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label>Date Of Birth <span className="text-danger"> *</span></label>
                                    <DatePicker
                                        name="dob"
                                        className="form-control"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        showPopperArrow={false}
                                        onChange={(date) => setProfileInputData({ ...profileInputData, dob: date })}
                                        selected={profileInputData.dob}
                                        autoComplete="nope"
                                        required="required"
                                        placeholderText="Select DOB"
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="gender" labelText="Male" value="M" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="gender" labelText="Female" value="F" />
                                        <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="gender" labelText="Nonbinary" value="NB" />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <TextArea
                                        name="brief_intro"
                                        placeholder="Enter Brief Intro"
                                        labelText="Brief Intro"
                                        required="required"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="mt-5 text-center">
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="green w-50"
                                        BtnText="Finish"
                                        hasSpinner={CPSubmitClick && profileComSelector.loading}
                                        disabled={CPSubmitClick && profileComSelector.loading}
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
