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
import { isValidOnlyLetters, isValidZipcode } from "./../../views/Components/Validation/Validation"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import "./../../Patient/EditProfile/EditProfile.css"

toast.configure();
const ClinicCompleteProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [address, setAddress] = useState("");
    const [profileInputData, setProfileInputData] = useState({
        sponsor_name: "",
        speciality: [],
        condition: [],
        state_id: "",
        zip_code: "",
        address: "",
        latitude: null,
        longitude: null,
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

    const addressPlacePicker = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setProfileInputData({ ...profileInputData, address: value, latitude: latLng.lat, longitude: latLng.lng })
        setAddress(value);
    };

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
        if (!isSponsorNameVaild.status) {
            toast.error(isSponsorNameVaild.message, { theme: "colored" })
            return false
        } else if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored" })
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
            routing_number: profileInputData.routing_number,
            latitude: profileInputData.latitude,
            longitude: profileInputData.longitude
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
                                    <label> Specialty <span className="text-danger"> *</span></label>
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
                                    <label> Mental Health Condition <span className="text-danger"> *</span></label>
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
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        onSelect={addressPlacePicker}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div className="form-group">
                                                <label> Address <span className="text-danger"> *</span> </label>
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
                                        type="text"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                        onChange={onChange}
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
