import React, { useEffect, useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import RadioBtn from "../../views/Components/Common/RadioBtn/RadioBtn";
import Button from "../../views/Components/Common/Buttons/Buttons"
import DatePicker from "react-datepicker";
import Header from "../../views/Components/FrontHeader/FrontHeader";
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { StatesAction } from "../../redux/actions/commonAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { PatientCompleteProfileAction } from "../../redux/actions/profileAction";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidZipcode } from "./../../views/Components/Validation/Validation"
import "./../../Patient/EditProfile/EditProfile.css"
import moment from "moment";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

// toast.configure();
var jwt = require('jsonwebtoken');
const PatientCompleteProfile = () => {
    const dispatch = useDispatch();
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const history = useHistory()
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [trialFor, setTrialFor] = useState(true)
    const [address, setAddress] = useState("");
    const [profileInputData, setProfileInputData] = useState({
        state_id: "",
        zip_code: "",
        dob: null,
        gender: "M",
        address: "",
        latitude: null,
        longitude: null,
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: "",
        race:"",
        medical_cond:"",
        trials_for: "Myself",
        speciality: [],
        condition: [],
        physician_fname: "",
        physician_lname: "",
        physician_email: "",
        physician_phone_number: ""
    });

    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("profileInputData", profileInputData);

    useEffect(() => {
        if (profileDetails.isProfileCompleted) {
            history.push('/patient/dashboard');
        }
    }, [profileDetails, history]);

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(true)
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

    useEffect(() => {
        SpecialitiesAction();
    }, [])

    useEffect(() => {
        dispatch(StatesAction())
    }, [dispatch])


    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === "trials_for") {
            setTrialFor(!trialFor);
        }

        setProfileInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    const addressPlacePicker = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setProfileInputData({ ...profileInputData, address: value, latitude: latLng.lat, longitude: latLng.lng })
        setAddress(value);
    };

    const specialityOnChange = (e) => {
        setProfileInputData({ ...profileInputData, speciality: e })
        const speArr = e.map(value => value.id)
        let data = {
            speciality: speArr
        }
        ConditionsAction(data);
    }

    useEffect(() => {
        if (CPSubmitClick === true) {
            if (Object.keys(profileComSelector.data).length !== 0 && profileComSelector.loading === false) {
                toast.success(profileComSelector.data.data.message, { theme: "colored", autoClose: 5000})
                history.push("/patient/dashboard");
            } else if (Object.keys(profileComSelector.error).length !== 0 && profileComSelector.loading === false) {
                let err = profileComSelector.error.message;
                toast.error(err, { theme: "colored", autoClose: 5000});
                setCPSubmitClick(false)
            }
        }
    }, [CPSubmitClick, profileComSelector, history])

    const Vaildation = (value) => {
        console.log("value", value);
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
        const conditionArr = profileInputData.condition.map(value => value.id);
        let data = {
            state_id: profileInputData.state_id,
            zip_code: profileInputData.zip_code,
            dob: profileInputData.dob,
            race: profileInputData.race,
            medical_cond: profileInputData.medical_cond,
            gender: profileInputData.gender,
            address: profileInputData.address,
            longitude: profileInputData.longitude,
            latitude: profileInputData.latitude,
            bank_name: profileInputData.bank_name,
            account_holder_name: profileInputData.account_holder_name,
            account_number: profileInputData.account_number,
            routing_number: profileInputData.routing_number,
            trials_for: profileInputData.trials_for,
            speciality: specialityArr,
            condition: conditionArr,
            physician_fname: profileInputData.physician_fname,
            physician_lname: profileInputData.physician_lname,
            physician_email: profileInputData.physician_email,
            physician_phone_number: profileInputData.physician_phone_number
        }
        const isVaild = Vaildation(data)
        if (isVaild) {
            dispatch(PatientCompleteProfileAction(data))
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
                                    <SelectBox
                                        name="state_id"
                                        labelText="State"
                                        onChange={onChange}
                                        required="required"
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
                                        type="number"
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
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        onSelect={addressPlacePicker}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div className="form-group">
                                                <label> Address <span className="text-danger"> *</span></label>
                                                <div className="suggestion-wrapper">
                                                    <input
                                                        placeholder="Enter Address"
                                                        required={true}
                                                        name="address"
                                                        {...getInputProps({
                                                            placeholder: "Enter address",
                                                            className: "form-control"
                                                        })}
                                                    />
                                                    {suggestions?.length > 0 &&
                                                        <ul className="location-suggestion-block">
                                                            {loading ? <li>...loading</li> : null}
                                                            {suggestions.map((suggestion, index) => {
                                                                const style = {
                                                                    backgroundColor: suggestion.active ? "#4096ee" : "#fff",
                                                                    cursor: suggestion.active && "pointer"
                                                                };
                                                                return (
                                                                    <li key={index} {...getSuggestionItemProps(suggestion, { style })}>
                                                                        {suggestion.description}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>

                                <div className="col-lg-6">
                                    <SelectBox
                                        labelText="Select Race"
                                        onChange={onChange}
                                        name="race"
                                        optionData=
                                        {
                                            <>
                                                <option value="0" hidden>Select Race</option>
                                                <option value="Asian">Asian</option>
                                                <option value="Black or African American">Black or African American</option>
                                                <option value="Hispanic or Latino">Hispanic or Latino</option>
                                                <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                                                <option value="White">White</option>
                                                <option value="Other">Other</option>
                                            </>
                                        }
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
                                        placeholder="Here..."
                                        labelText="Medical Conditions and Medications"
                                        name="medical_cond"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Trial Information</h2>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Seeking Trials for <span className="text-danger"> *</span></label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={profileInputData.speciality}
                                            onChange={specialityOnChange}
                                            disableSearch={true}
                                            labelledBy="Seeking Trials for"
                                            className="multiSelect-control"
                                            name="speciality"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Health Condition <span className="text-danger"> *</span></label>
                                        <MultiSelect
                                            options={conditionList !== undefined && conditionList}
                                            value={profileInputData.condition}
                                            onChange={(e) => setProfileInputData({ ...profileInputData, condition: e })}
                                            disableSearch={true}
                                            labelledBy="Health Condition"
                                            className="multiSelect-control"
                                            name="condition"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>Trials for</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="trials_for" value="Myself" labelText="Myself" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="trials_for" value="Family_Or_Friends" labelText="Family/Friends" />
                                    </div>
                                </div>

                                {
                                    trialFor &&
                                    <>
                                        <div className="col-lg-12 mt-3 mb-3">
                                            <h2>Share Your Physician Details <small>(if any)</small></h2>
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="text"
                                                name="physician_fname"
                                                placeholder="First Name"
                                                labelText="First Name"
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="text"
                                                name="physician_lname"
                                                placeholder="Last Name"
                                                labelText="Last Name"
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="email"
                                                name="physician_email"
                                                placeholder="Enter Email"
                                                labelText="Email"
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <InputText
                                                type="number"
                                                name="physician_phone_number"
                                                placeholder="Enter Phone Number"
                                                labelText="Phone Number"
                                                onChange={onChange}
                                            />
                                        </div>
                                    </>
                                }

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

export default PatientCompleteProfile;
