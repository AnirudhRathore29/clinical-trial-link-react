import { useEffect, useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "../../views/Components/Common/Buttons/Buttons"
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "../../TrialSponsors/EditProfile/ChangePassword";
import { ProfileAction } from "../../redux/actions/profileAction";
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { StatesAction } from "../../redux/actions/commonAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost, { getImageUrl } from "../../redux/constants";
import { ProfileUpdateAction } from "../../redux/actions/profileAction";
import { authHeader } from "../../redux/actions/authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../TrialSponsors/EditProfile/Profile.css"
import { useHistory } from "react-router-dom";
import { isValidOnlyLetters, isValidZipcode } from "./../../views/Components/Validation/Validation"
import "./../../Patient/EditProfile/EditProfile.css"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

const conditionListAPI = []
const specialityListAPI = []
const sponsorUploadedDoc = []
const file_upload = []
const ClinicEditProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const totalFiles = 5;
    const dataSelector = useSelector(state => state.common_data)
    const profileSelector = useSelector(state => state.profile.data.data);
    const profileUploadSelector = useSelector(state => state.profile);

    const [profileSubmitClick, setProfileSubmitClick] = useState(false);
    const [hidePrincipalInvestigator, setHidePrincipalInvestigator] = useState(0)
    const [hideBankDetails, setHideBankDetails] = useState(0)

    const [listingBinary, setListingBinary] = useState()
    const [fullListingBinaryUrl, setFullListingBinaryUrl] = useState([]);

    const [uploadedFile, setUploadFile] = useState([]);
    // const [uploadedFileURLs, setUploadedFileURLs] = useState([]);

    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [binary, setBinary] = useState();
    const [fullBinaryUrl, setFullBinaryUrl] = useState();
    const [address, setAddress] = useState("");
    const [profileInputData, setProfileInputData] = useState({
        clinic_name: "",
        phone_number: "",
        state_id: "",
        address: "",
        latitude: null,
        longitude: null,
        zip_code: "",
        brief_intro: "",
        speciality: [],
        condition: [],
        principal_investigator_name: "",
        principal_investigator_email: "",
        principal_investigator_brief_intro: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: "",
        listing_image: "",
        documents: []
    });

    useEffect(() => {
        dispatch(ProfileAction())
        dispatch(StatesAction())
    }, [dispatch])

    useEffect(() => {
        if (profileSelector !== undefined) {
            let speciality_data = profileSelector.data.user_speciality;
            let conditionList_data = profileSelector.data.user_condition;

            for (var i = 0; i < speciality_data?.length; i++) {
                const obj = Object.assign({}, speciality_data[i]);
                obj.label = speciality_data[i].speciality_info.speciality_title;
                obj.value = speciality_data[i].trial_category_speciality_id;
                specialityListAPI.push(obj)
            }
            for (var j = 0; j < conditionList_data?.length; j++) {
                const obj = Object.assign({}, conditionList_data[j]);
                obj.label = conditionList_data[j].condition_info.condition_title;
                obj.value = conditionList_data[j].condition_info.id;
                conditionListAPI.push(obj)
            }

            for (var t = 0; t < profileSelector.data.user_document?.length; t++) {
                const obj = Object.assign({}, profileSelector.data.user_document[t]);
                obj.file_type = profileSelector.data.user_document[t].real_doc_name.substr(profileSelector.data.user_document[t].real_doc_name.lastIndexOf('.') + 1);
                obj.file_name = profileSelector.data.user_document[t].real_doc_name.split(".")[0];
                sponsorUploadedDoc.push(obj)
            }

            setHidePrincipalInvestigator(profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.hide_principal_investigator_details : 0)
            setHideBankDetails(profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.hide_bank_details : 0)

            setAddress(profileSelector.data.address)
            setProfileInputData({
                ...profileInputData,
                clinic_name: profileSelector.data.clinic_name,
                state_id: profileSelector.data.state_id,
                address: profileSelector.data.address,
                zip_code: profileSelector.data.zip_code,
                speciality: specialityListAPI,
                condition: conditionListAPI,
                brief_intro: profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.brief_intro : "",
                principal_investigator_name: profileSelector.data.user_meta_info !== null ? profileSelector.data.user_meta_info.principal_investigator_name : "",
                principal_investigator_email: profileSelector.data.user_meta_info !== null ? profileSelector.data.user_meta_info.principal_investigator_email : "",
                principal_investigator_brief_intro: profileSelector.data.user_meta_info !== null ? profileSelector.data.user_meta_info.principal_investigator_brief_intro : "",
                bank_name: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.bank_name : "",
                account_holder_name: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.account_holder_name : "",
                account_number: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.account_number : "",
                routing_number: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.routing_number : "",
                listing_image: profileSelector.data.listing_image,
                documents: sponsorUploadedDoc
            });
        }
    }, [profileSelector])

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

    useEffect(() => {
        SpecialitiesAction()
    }, [])

    const addressPlacePicker = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setProfileInputData({ ...profileInputData, address: value, latitude: latLng.lat, longitude: latLng.lng })
        setAddress(value);
    };

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (e.target.name === "profile_image") {
            var output = document.getElementById("profileImage-upload");
            var binaryData = [];
            binaryData.push(files[0]);
            const extention = value.substr(value.lastIndexOf('.') + 1);
            if (binaryData[0] !== undefined) {
                if (
                    extention === "jpg" ||
                    extention === "jpeg" ||
                    extention === "png"
                ) {
                    output.src = URL.createObjectURL(
                        new Blob(binaryData, { type: "application/zip" })
                    );
                    setFullBinaryUrl(output.src)
                    output.onload = () => {
                        URL.revokeObjectURL(output.src);
                    };
                    setBinary(binaryData[0])
                } else {
                    toast.error("Only image with .jpeg, .jpg, .png extentions are valid.", { theme: "colored" });
                }
            }
        }

        setProfileInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }

    const handleHidePrincipalInvestigator = () => {
        setHidePrincipalInvestigator(!hidePrincipalInvestigator);
    }
    const handleHideBankDetail = () => {
        setHideBankDetails(!hideBankDetails);
    }
    const renderTooltip = (props) => (
        <Tooltip {...props}> Optional to share Principal Investigator Details with the sponsor </Tooltip>
    );
    const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}> Optional to receive payments from the sponsor directly through the application </Tooltip>
    );

    const updateFileHandler = async (e) => {
        const { value, files } = e.target;
        var output = document.getElementById("listing_image");
        var listingBinaryData = [];
        listingBinaryData.push(files[0]);
        const extention = value.substr(value.lastIndexOf('.') + 1);
        if (listingBinaryData[0] !== undefined) {
            if (
                extention === "jpg" ||
                extention === "jpeg" ||
                extention === "png"
            ) {
                output.src = URL.createObjectURL(
                    new Blob(listingBinaryData, { type: "application/zip" })
                );
                setFullListingBinaryUrl(output.src)
                output.onload = () => {
                    URL.revokeObjectURL(output.src);
                };
                setListingBinary(listingBinaryData[0])
            } else {
                toast.error("Only image with .jpeg, .jpg, .png extentions are valid.", { theme: "colored" });
            }
        }
    }

    const handleListingRemove = () => {
        setListingBinary(undefined);
        setProfileInputData({ ...profileInputData, listing_image: null });
    }

    const uploadSponsorFileHandler = async (e) => {
        const files = e.target.files;
        if (files.length > 0 && files.length <= totalFiles) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                let arr = {
                    file_type: files[i].name.substr(files[i].name.lastIndexOf('.') + 1),
                    file_name: files[i].name.split("." + files[i].name.substr(files[i].name.lastIndexOf('.') + 1))[0],
                    real_doc_name: files[i].name
                }
                file_upload.push(arr)
                uploadedFile.push(files[i])
                setUploadFile(uploadedFile);
            }
            setProfileInputData({ ...profileInputData, documents: [...profileInputData.documents, ...file_upload] });
        } else (
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
        )
        e.target.value = null;
    }

    const handleRemoveFile = (item) => {
        setProfileInputData({ ...profileInputData, documents: profileInputData.documents.filter(el => el.file_name !== item.file_name) });
        setUploadFile(uploadedFile.filter(el => el.name !== item.real_doc_name))
    }

    //form validation handler
    const validate = (values) => {
        const isClinicNameVaild = isValidOnlyLetters(values.clinic_name, "clinic name")
        const isZipcodeVaild = isValidZipcode(values.zip_code)
        if (!isClinicNameVaild.status) {
            toast.error(isClinicNameVaild.message, { theme: "colored" })
            return false
        } else if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored" })
            return false
        } else if (values.documents.length > 5) {
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
            return false
        }
        return true;
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.value);
        const conditionArr = profileInputData.condition.map(value => value.value);

        let formData = new FormData();
        if (binary !== undefined) {
            formData.append("profile_image", binary)
        }
        formData.append("clinic_name", profileInputData.clinic_name);
        formData.append("state_id", profileInputData.state_id);
        formData.append("address", profileInputData.address);
        formData.append("zip_code", profileInputData.zip_code);
        formData.append("brief_intro", profileInputData.brief_intro);
        formData.append("principal_investigator_name", profileInputData.principal_investigator_name !== null ? profileInputData.principal_investigator_name : "");
        formData.append("principal_investigator_email", profileInputData.principal_investigator_email !== null ? profileInputData.principal_investigator_email : "");
        formData.append("principal_investigator_brief_intro", profileInputData.principal_investigator_brief_intro !== null ? profileInputData.principal_investigator_brief_intro : "");
        formData.append("bank_name", profileInputData.bank_name);
        formData.append("account_holder_name", profileInputData.account_holder_name);
        formData.append("account_number", profileInputData.account_number);
        formData.append("routing_number", profileInputData.routing_number);
        formData.append("hide_principal_investigator_details", hidePrincipalInvestigator);
        formData.append("hide_bank_details", hideBankDetails);
        if(profileInputData.latitude && profileInputData.longitude){
            formData.append("latitude", profileInputData.latitude)
            formData.append("longitude", profileInputData.longitude)
        }
        if (listingBinary !== undefined) {
            formData.append("listing_image", listingBinary)
        } else {
            formData.append("listing_image_url", profileInputData.listing_image !== null ? profileInputData.listing_image : "")
        }
        for (let i = 0; i < specialityArr.length; i++) {
            formData.append(`speciality[${i}]`, specialityArr[i]);
        }
        for (let j = 0; j < conditionArr.length; j++) {
            formData.append(`condition[${j}]`, conditionArr[j]);
        }
        for (let t = 0; t < uploadedFile.length; t++) {
            formData.append(`documents[${t}]`, uploadedFile[t]);
        }
        for (let t = 0; t < profileInputData.documents.length; t++) {
            formData.append(`existing_documents[${t}]`, profileInputData.documents[t].document);
        }
        const isVaild = validate(profileInputData);
        if (isVaild) {
            dispatch(ProfileUpdateAction(formData, "trialclinic"))
            setProfileSubmitClick(true)
        }
    }

    useEffect(() => {
        if (profileSubmitClick) {
            if (Object.keys(profileUploadSelector.profile_edit).length !== 0 && !profileUploadSelector.loading) {
                toast.success(profileUploadSelector.profile_edit.message, { theme: "colored" })
                history.push("/trial-clinic/dashboard")
                dispatch(ProfileAction())
            } else if (Object.keys(profileUploadSelector.error).length !== 0 && !profileUploadSelector.loading) {
                toast.error(profileUploadSelector.error.message, { theme: "colored" })
                setProfileSubmitClick(false)
            }
        }
    }, [profileUploadSelector, profileSubmitClick, dispatch, history]);

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
                                {profileSelector !== undefined ?
                                    <form onSubmit={handleSubmitProfile} autoComplete="off">
                                        <h2 className="section-title">Personal Info</h2>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <label className="update-profile-bx">
                                                    <input
                                                        type="file"
                                                        name="profile_image"
                                                        className="d-none"
                                                        id="profileImage-upload"
                                                        onChange={onChange}
                                                        accept="image/*"
                                                    />
                                                    {profileSelector.data.profile_image !== null || binary ?
                                                        binary ?
                                                            <img src={fullBinaryUrl} width={120} className='img-fluid uploaded-img rounded-circle' alt={profileSelector.data.sponsor_name} />
                                                            :
                                                            <img
                                                                src={profileSelector.data.profile_image ?
                                                                    getImageUrl() + profileSelector.data.profile_image
                                                                    : '/images/avatar2.svg'}
                                                                width={120}
                                                                className='img-fluid uploaded-img rounded-circle'
                                                                // referrerPolicy="no-referrer"
                                                                alt={profileSelector.data.sponsor_name}
                                                            />
                                                        : <img src="/images/avatar2.svg" className='img-fluid' alt={profileSelector.data.sponsor_name} />}

                                                    <span><box-icon type='solid' name='camera' color="#ffffff" size="18px"></box-icon></span>
                                                </label>
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="clinic_name"
                                                    placeholder="Enter Clinic Name"
                                                    labelText="Clinic Name"
                                                    onChange={onChange}
                                                    defaultValue={profileSelector.data.clinic_name}
                                                    required={true}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="email"
                                                    name="email"
                                                    defaultValue={profileSelector.data.email}
                                                    placeholder="Enter Email Address"
                                                    labelText="Email Address"
                                                    isDisabled={true}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="number"
                                                    name="phone_number"
                                                    defaultValue={profileSelector.data.phone_number}
                                                    placeholder="Enter phone number"
                                                    labelText="Phone Number"
                                                    isDisabled={true}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <SelectBox
                                                    name="state_id"
                                                    labelText="State"
                                                    onChange={onChange}
                                                    required={true}
                                                    optionData={
                                                        <>
                                                            <option value=""> Select State </option>
                                                            {
                                                                Object.keys(dataSelector).length !== 0 && dataSelector.data.data.map((value, index) => {
                                                                    return (
                                                                        <option selected={value.id === profileSelector.data.state_id} value={value.id} key={index}> {value.name} </option>
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
                                                                                cursor: suggestion.active && "pointer",
                                                                                color: suggestion.active ? "#fff" : "#000",
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
                                                    type="text"
                                                    name="zip_code"
                                                    placeholder="Enter zip code"
                                                    labelText="Zip Code"
                                                    onChange={onChange}
                                                    required={true}
                                                    defaultValue={profileSelector.data.zip_code}
                                                />
                                            </div>
                                        </div>

                                        <h2 className="section-title mt-4"> Listing Info </h2>
                                        <div className="row">
                                            <div className="col-lg-4 form-group">
                                                <label>Upload Listing Image <span className="text-danger"> *</span></label>
                                                <label className="upload-document single-file-uploader w-100">
                                                    <input type="file" name="listing_image" id="listing_image" accept="image/*" onChange={updateFileHandler} />
                                                    <div>
                                                        <h4> No File Uploaded </h4>
                                                        <h3>Tap Here to Upload your File</h3>
                                                    </div>
                                                </label>
                                            </div>

                                            {profileInputData.listing_image !== null || listingBinary !== undefined ?
                                                <div className="col-lg-4 form-group">
                                                    <label> &nbsp; </label>
                                                    <div className="listing-img-block">
                                                        <button type="button" className="btn btn-danger" onClick={handleListingRemove}> <box-icon name='x' size="18px" color="#ffffff"></box-icon> </button>
                                                        {listingBinary ?
                                                            <img src={fullListingBinaryUrl} className='img-fluid' alt={profileInputData.clinic_name} />
                                                            :
                                                            <img
                                                                src={profileInputData.listing_image && getImageUrl() + profileInputData.listing_image}
                                                                className='img-fluid'
                                                                alt={profileInputData.clinic_name}
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                            }
                                        </div>

                                        <h2 className="section-title mt-4">Other Info</h2>
                                        <div className="row">
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
                                                <label> Condition <span className="text-danger"> *</span></label>
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

                                            <div className="col-lg-12">
                                                <TextArea
                                                    placeholder="Enter Brief Intro"
                                                    labelText="Brief Intro"
                                                    onChange={onChange}
                                                    name="brief_intro"
                                                    required={true}
                                                    defaultData={profileSelector.data.user_meta_info !== null && profileSelector.data.user_meta_info.brief_intro}
                                                />
                                            </div>

                                            <div className="col-lg-12 form-group">
                                                <label>Upload any Relevant Documents to the Sponsor <span className="text-danger"> *</span></label>
                                                <label className="upload-document">
                                                    <input type="file" id="uploadClinic-input" className='d-none' hidden="" name="documents" accept=".doc,.pdf,.docx" multiple onChange={uploadSponsorFileHandler} max="2" />
                                                    <div>
                                                        <h4>File Name Here </h4>
                                                        <h3>Tap here to upload your new file</h3>
                                                    </div>
                                                </label>
                                            </div>

                                            {profileInputData.documents?.map((value, index) => {
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
                                        </div>
                                        <h2 className="section-title mt-4 with-btn"><span>Share Principal Investigator Details </span>
                                            <span className="d-flex align-items-center">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={renderTooltip}
                                                >
                                                    <button className="info-btn"><box-icon type='solid' name='info-circle' color="#4096EE"></box-icon></button>
                                                </OverlayTrigger>
                                                <label className="switch">
                                                    <input defaultChecked={profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.hide_principal_investigator_details : 0} name="hide_principal_investigator_details" type="checkbox" onChange={handleHidePrincipalInvestigator} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </h2>

                                        {profileSelector.data.user_meta_info !== null &&
                                            <div className={hidePrincipalInvestigator ? "sharing-disable row" : "row"}>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="principal_investigator_name"
                                                        placeholder="Enter Name"
                                                        labelText="Name"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_meta_info.principal_investigator_name !== null ? profileSelector.data.user_meta_info.principal_investigator_name : ""}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="email"
                                                        name="principal_investigator_email"
                                                        placeholder="Enter email"
                                                        labelText="Email"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_meta_info.principal_investigator_email !== null ? profileSelector.data.user_meta_info.principal_investigator_email : ""}
                                                    />
                                                </div>
                                                <div className="col-lg-12">
                                                    <TextArea
                                                        placeholder="Enter Brief Intro"
                                                        labelText="Brief Intro"
                                                        onChange={onChange}
                                                        name="principal_investigator_brief_intro"
                                                        defaultData={profileSelector.data.user_meta_info.principal_investigator_brief_intro !== null ? profileSelector.data.user_meta_info.principal_investigator_brief_intro : ""}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        <h2 className="section-title mt-4 with-btn"><span>Bank Details </span>
                                            <span className="d-flex align-items-center">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={renderTooltip2}
                                                >
                                                    <button className="info-btn"><box-icon type='solid' name='info-circle' color="#4096EE"></box-icon></button>
                                                </OverlayTrigger>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked={profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.hide_bank_details : 0} name="hide_bank_details" onChange={handleHideBankDetail} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </h2>


                                        <div className={hideBankDetails ? "sharing-disable row" : "row"}>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="bank_name"
                                                    placeholder="Enter Bank Name"
                                                    labelText="Name of Bank"
                                                    onChange={onChange}
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.bank_name : ""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="account_holder_name"
                                                    placeholder="Enter Name"
                                                    labelText="Account Holder Name"
                                                    onChange={onChange}
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.account_holder_name : ""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="account_number"
                                                    placeholder="Enter Account Number"
                                                    labelText="Account Number"
                                                    onChange={onChange}
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.account_number : ""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="routing_number"
                                                    placeholder="Enter Routing Number"
                                                    labelText="Routing Number"
                                                    onChange={onChange}
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.routing_number : ""}
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
                                            hasSpinner={profileSubmitClick && profileUploadSelector.loading}
                                            disabled={profileSubmitClick && profileUploadSelector.loading}
                                        />
                                    </form>
                                    :
                                    <LogoLoader />
                                }
                            </div>
                        </div>

                        <ChangePassword />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicEditProfile;
