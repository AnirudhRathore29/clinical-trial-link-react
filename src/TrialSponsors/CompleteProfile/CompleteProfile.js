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
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmailAddress, isValidOnlyLetters, isValidZipcode, isValidAccountNumber, isValidRoutingNumber } from "./../../views/Components/Validation/Validation"

toast.configure();
const ClinicCompleteProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
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

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(getCurrentHost() + "/get-clinical-specialities", requestOptions)
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
    }

    async function ConditionsAction(data) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(true),
            body: JSON.stringify(data)
        };
        return fetch(getCurrentHost() + "/get-clinical-conditions", requestOptions)
            .then(data => data.json())
            .then((response) => {
                var data = response.data;
                var conditionsArr = [];
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].condition_title;
                    obj.value = data[i].id;
                    conditionsArr.push(obj)
                }
                setConditionList(conditionsArr);
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    const specialityOnChange = (e) => {
        setProfileInputData({ ...profileInputData, speciality: e })
        const speArr = e.map(value => value.id)
        let data = {
            speciality: speArr
        }

        ConditionsAction(data);
    }

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
        SpecialitiesAction()
    }, [])


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

    const Vaildation = (value) => {
        const isSponsorNameVaild = isValidOnlyLetters(value.sponsor_name, "sponsor name")
        const isZipcodeVaild = isValidZipcode(value.zip_code)
        const isBanknameVaild = isValidOnlyLetters(value.bank_name, "bank name")
        const isHoldernameVaild = isValidOnlyLetters(value.account_holder_name, "account holder name")
        const isAccountnumVaild = isValidAccountNumber(value.account_number)
        const isRoutingnumVaild = isValidRoutingNumber(value.routing_number)
        if (!isSponsorNameVaild.status) {
            toast.error(isSponsorNameVaild.message, { theme: "colored" })
            return false
        } else if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored" })
            return false
        } else if (!isBanknameVaild.status) {
            toast.error(isBanknameVaild.message, { theme: "colored" })
            return false
        } else if (!isHoldernameVaild.status) {
            toast.error(isHoldernameVaild.message, { theme: "colored" })
            return false
        } else if (!isAccountnumVaild.status) {
            toast.error(isAccountnumVaild.message, { theme: "colored" })
            return false
        } else if (!isRoutingnumVaild.status) {
            toast.error(isRoutingnumVaild.message, { theme: "colored" })
            return false
        }
        return true
    }

    const CompleteProfileSubmit = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.id);
        const conditionArr = profileInputData.condition.map(value => value.id);
        let data = {
            sponsor_name: profileInputData.sponsor_name,
            speciality: specialityArr,
            condition: conditionArr,
            state_id: profileInputData.state_id,
            zip_code: profileInputData.zip_code,
            address: profileInputData.address,
            brief_intro: profileInputData.brief_intro,
            bank_name: profileInputData.bank_name,
            account_holder_name: profileInputData.account_holder_name,
            account_number: profileInputData.account_number,
            routing_number: profileInputData.routing_number
        }
        const isVaild = Vaildation(data)
        if (isVaild) {
            dispatch(SponsorCompleteProfileAction(data))
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
                        <form onSubmit={CompleteProfileSubmit} autoComplete="off">
                            <div className="row">
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="sponsor_name"
                                        placeholder="Enter Sponsor Name"
                                        labelText="Sponsor Name"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label> Specialty </label>
                                    <MultiSelect
                                        options={specialityList !== undefined && specialityList}
                                        value={profileInputData.speciality}
                                        onChange={specialityOnChange}
                                        disableSearch={true}
                                        labelledBy="Specialty"
                                        className="multiSelect-control"
                                        name="speciality"
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label> Mental Health Condition </label>
                                    <MultiSelect
                                        options={conditionList !== undefined && conditionList}
                                        value={profileInputData.condition}
                                        onChange={(e) => setProfileInputData({ ...profileInputData, condition: e })}
                                        disableSearch={true}
                                        labelledBy="Mental Health Condition"
                                        className="multiSelect-control"
                                        name="condition"
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
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="number"
                                        name="zip_code"
                                        placeholder="Enter zip code"
                                        labelText="Zip Code"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <TextArea
                                        name="brief_intro"
                                        placeholder="Enter Brief Intro"
                                        labelText="Brief Intro"
                                        onChange={onChange}
                                        required="required"
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
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_holder_name"
                                        placeholder="Enter Name"
                                        labelText="Account Holder Name"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                        onChange={onChange}
                                        required="required"
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

export default ClinicCompleteProfile;
