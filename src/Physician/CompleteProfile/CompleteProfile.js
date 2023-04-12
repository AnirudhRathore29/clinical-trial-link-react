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
import { MultiSelect } from "react-multi-select-component";
import { isValidZipcode } from "./../../views/Components/Validation/Validation"
import moment from "moment";
import { authHeader } from "../../redux/actions/authHeader";
import getCurrentHost from "../../redux/constants";

// toast.configure();
var jwt = require('jsonwebtoken');
const PhysicianCompleteProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [specialityList, setSpecialityList] = useState([]);
    const [profileInputData, setProfileInputData] = useState({
        state_id: "",
        zip_code: "",
        dob: null,
        gender: "M",
        brief_intro: "",
        speciality: [],
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: "",
    });

    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("profileInputData", profileInputData);
    console.log("specialityList", specialityList);

    const onChange = (e) => {
        const { name, value } = e.target;

        setProfileInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }

    const specialityOnChange = (e) => {
        setProfileInputData({ ...profileInputData, speciality: e })
    }

    useEffect(() => {
        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: authHeader(true)
            };
            await fetch(getCurrentHost() + "/get-clinical-specialities", requestOptions)
                .then(data => data.json())
                .then((response) => {
                    let data = response.data;
                    for (var i = 0; i < data?.length; i++) {
                        const obj = Object.assign({}, data[i]);
                        obj.label = data[i].speciality_title;
                        obj.value = data[i].id;
                        setSpecialityList(oldArray => [...oldArray, obj]);
                    }
                })
                .catch(err => {
                    console.log("err", err)
                })
        })();
    }, [])

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
                toast.success(profileComSelector.data.data.message, { theme: "colored", autoClose: 5000})
                history.push("/physician/dashboard");
            } else if (Object.keys(profileComSelector.error).length !== 0 && profileComSelector.loading === false) {
                let err = profileComSelector.error.message;
                toast.error(err, { theme: "colored", autoClose: 5000});
                setCPSubmitClick(false)
            }
        }
    }, [CPSubmitClick, profileComSelector, history])

    const Vaildation = (value) => {
        const isZipcodeVaild = isValidZipcode(value.zip_code)
        if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored", autoClose: 5000})
            return false
        }
        return true
    }

    const CompleteProfileSubmit = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.id);
        let data = {
            state_id: profileInputData.state_id,
            zip_code: profileInputData.zip_code,
            dob: profileInputData.dob,
            gender: profileInputData.gender,
            speciality: specialityArr,
            brief_intro: profileInputData.brief_intro,
            bank_name: profileInputData.bank_name,
            account_holder_name: profileInputData.account_holder_name,
            account_number: profileInputData.account_number,
            routing_number: profileInputData.routing_number,
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
                                        maxDate={moment().toDate()}
                                        autoComplete="nope"
                                        required="required"
                                        placeholderText="Select DOB"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Specialty <span className="text-danger"> *</span></label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={profileInputData?.speciality}
                                            onChange={specialityOnChange}
                                            disableSearch={true}
                                            labelledBy="Seeking Trials for"
                                            className="multiSelect-control"
                                            name="speciality"
                                        />
                                    </div>
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

                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Add Bank Details</h2>
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="bank_name"
                                        placeholder="Enter Bank Name"
                                        labelText="Name of Bank"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_holder_name"
                                        placeholder="Enter Name"
                                        labelText="Account Holder Name"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="number"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="number"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <div className='info-bx br-none p-0 mb-5'>
                                        <box-icon type='solid' name='info-circle' color="#4096EE" size="22px"></box-icon> Need bank details for your referral amount.
                                    </div>
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
