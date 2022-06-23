import React, { useState, useEffect } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import Header from "../../views/Components/FrontHeader/FrontHeader";
import 'boxicons';
import "../../views/pages/Login/Login.css"
import { StatesAction } from "../../redux/actions/commonAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { useDispatch, useSelector } from "react-redux";
import { TrialClinicCompleteProfileAction } from "../../redux/actions/profileAction";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmailAddress, isValidOnlyLetters, isValidZipcode, isValidAccountNumber, isValidRoutingNumber } from "./../../views/Components/Validation/Validation"
import "./../../Patient/EditProfile/EditProfile.css"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

toast.configure();
const ClinicCompleteProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const totalFiles = 5;
    const [uploadedFile, setUploadFile] = useState([]);
    const [uploadedFileURLs, setUploadedFileURLs] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [address, setAddress] = useState("");
    const [profileInputData, setProfileInputData] = useState({
        clinic_name: "",
        speciality: [],
        condition: [],
        state_id: "",
        address: "",
        latitude: null,
        longitude: null,
        zip_code: "",
        brief_intro: "",
        principal_investigator_name: "",
        principal_investigator_email: "",
        principal_investigator_brief_intro: "",
        documents: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: ""
    });

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

    const handleRemoveFile = (item) => {
        setUploadedFileURLs(uploadedFileURLs.filter(el => el.file_name !== item.file_name));
    }

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        if (files.length > 0 && files.length <= totalFiles) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                let arr = {
                    file_type: files[i].name.substr(files[i].name.lastIndexOf('.') + 1),
                    file_name: files[i].name.split("." + files[i].name.substr(files[i].name.lastIndexOf('.') + 1))[0]
                }
                setUploadedFileURLs(uploadedFileURLs => [...uploadedFileURLs, arr]);
                uploadedFile.push(files[i])
                setUploadFile(uploadedFile);
            }
        } else (
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
        )
        e.target.value = null;
    }

    useEffect(() => {
        if (CPSubmitClick === true) {
            if (Object.keys(profileComSelector.data).length !== 0 && profileComSelector.loading === false) {
                toast.success(profileComSelector.data.data.message, { theme: "colored" })
                history.push("/trial-clinic/dashboard");
            } else if (Object.keys(profileComSelector.error).length !== 0 && profileComSelector.loading === false) {
                let err = profileComSelector.error.message;
                toast.error(err, { theme: "colored" });
                setCPSubmitClick(false)
            }
        }
    }, [CPSubmitClick, profileComSelector, history])

    const Vaildation = (value, file) => {
        const isClinicNameVaild = isValidOnlyLetters(value.clinic_name, "clinic name")
        const isZipcodeVaild = isValidZipcode(value.zip_code)
        const isNameVaild = isValidOnlyLetters(value.principal_investigator_name, "principal investigator name")
        const isEmailVaild = isValidEmailAddress(value.principal_investigator_email)
        const isBanknameVaild = isValidOnlyLetters(value.bank_name, "bank name")
        const isHoldernameVaild = isValidOnlyLetters(value.account_holder_name, "account holder name")
        const isAccountnumVaild = isValidAccountNumber(value.account_number)
        const isRoutingnumVaild = isValidRoutingNumber(value.routing_number)

        if (!isClinicNameVaild.status) {
            toast.error(isClinicNameVaild.message, { theme: "colored" })
            return false
        } else if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored" })
            return false
        } else if (file?.length > 5) {
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
            return false
        } else if (!isNameVaild.status) {
            toast.error(isNameVaild.message, { theme: "colored" })
            return false
        } else if (!isEmailVaild.status) {
            toast.error(isEmailVaild.message, { theme: "colored" })
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
        if (uploadedFile.length > 0) {
            let formData = new FormData();
            formData.append("clinic_name", profileInputData.clinic_name);
            formData.append("state_id", profileInputData.state_id);
            formData.append("address", profileInputData.address);
            formData.append("zip_code", profileInputData.zip_code);
            formData.append("brief_intro", profileInputData.brief_intro);
            formData.append("principal_investigator_name", profileInputData.principal_investigator_name);
            formData.append("principal_investigator_email", profileInputData.principal_investigator_email);
            formData.append("principal_investigator_brief_intro", profileInputData.principal_investigator_brief_intro);
            formData.append("bank_name", profileInputData.bank_name);
            formData.append("account_holder_name", profileInputData.account_holder_name);
            formData.append("account_number", profileInputData.account_number);
            formData.append("routing_number", profileInputData.routing_number);
            formData.append("latitude", profileInputData.latitude)
            formData.append("longitude", profileInputData.longitude)
            for (let i = 0; i < specialityArr.length; i++) {
                formData.append(`speciality[${i}]`, specialityArr[i]);
            }
            for (let j = 0; j < conditionArr.length; j++) {
                formData.append(`condition[${j}]`, conditionArr[j]);
            }
            for (let t = 0; t < uploadedFile.length; t++) {
                formData.append(`documents[${t}]`, uploadedFile[t]);
            }
            const isVaild = Vaildation(profileInputData)
            if (isVaild) {
                dispatch(TrialClinicCompleteProfileAction(formData, uploadedFile))
                setCPSubmitClick(true)
            }
        }
        else (
            toast.error("Document is required", { theme: "colored" })
        )
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
                                        name="clinic_name"
                                        placeholder="Enter Clinic Name"
                                        labelText="Clinic Name"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Speciality </label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={profileInputData.speciality}
                                            onChange={specialityOnChange}
                                            disableSearch={true}
                                            labelledBy="Speciality"
                                            className="multiSelect-control"
                                            name="speciality"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Condition </label>
                                        <MultiSelect
                                            options={conditionList !== undefined && conditionList}
                                            value={profileInputData.condition}
                                            onChange={(e) => setProfileInputData({ ...profileInputData, condition: e })}
                                            disableSearch={true}
                                            labelledBy="Condition"
                                            className="multiSelect-control"
                                            name="condition"
                                        />
                                    </div>
                                </div>

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
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        onSelect={addressPlacePicker}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div className="form-group">
                                                <label> Address </label>
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

                                <div className="col-lg-12 form-group">
                                    <label>Upload any Relevant Documents to the Sponsor <span className="text-danger"> *</span></label>
                                    <label className="upload-document" htmlFor="uploadClinic-input">
                                        <input type="file" id="uploadClinic-input" className='d-none' hidden="" name="documents" accept=".doc,.pdf,.docx" multiple onChange={handleFileUpload} max={totalFiles} />
                                        <div>
                                            <h4>No File Uploaded</h4>
                                            <h3>Tap Here to Upload your File</h3>
                                        </div>
                                    </label>
                                </div>

                                {uploadedFileURLs?.map((value, index) => {
                                    return (
                                        <div className="col-md-3 mb-3" key={index}>
                                            <div className="uploaded-file text-center">
                                                <span className="uploaded-type"> {value.file_type} </span>
                                                <span className="uploaded-name"> {value.file_name} </span>
                                                <button type="button" className="btn" onClick={() => handleRemoveFile(value)}><box-icon name='x' size="18px" color="#ffffff"></box-icon></button>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Share Principal Investigator Details</h2>
                                </div>

                                <div className="col-lg-6">
                                    <InputText
                                        type="name"
                                        name="principal_investigator_name"
                                        placeholder="Enter Name"
                                        labelText="Name"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <InputText
                                        type="email"
                                        name="principal_investigator_email"
                                        placeholder="Enter Email"
                                        labelText="Email"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <TextArea
                                        name="principal_investigator_brief_intro"
                                        placeholder="Enter Brief Intro"
                                        labelText="Brief Intro"
                                        onChange={onChange}
                                        required="required"
                                    />
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
                                        type="number"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                        onChange={onChange}
                                        required="required"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="number"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                        onChange={onChange}
                                        required="required"
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
