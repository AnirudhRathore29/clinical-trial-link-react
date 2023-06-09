import { useEffect, useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import { ProfileAction, ProfileUpdateAction } from "../../redux/actions/profileAction";
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { StatesAction } from "../../redux/actions/commonAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { ALLOW_LETTERS_ONLY } from "./../../utils/ValidationRegex";
import "./Profile.css"
import "./../../Patient/EditProfile/EditProfile.css"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import { Encryption } from "../../utils/PayloadEncryption";

// toast.configure();
var conditionListAPI = []
var specialityListAPI = []
const SponsorsEditProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dataSelector = useSelector(state => state.common_data)
    const profileSelector = useSelector(state => state.profile.data.data);
    const UpdateProfileSelector = useSelector(state => state.profile)

    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [binary, setBinary] = useState();
    const [fullBinaryUrl, setFullBinaryUrl] = useState();

    const [listingBinary, setListingBinary] = useState()
    const [fullListingBinaryUrl, setFullListingBinaryUrl] = useState([]);

    const [profileSubmitClick, setProfileSubmitClick] = useState(false);
    const [address, setAddress] = useState("");
    const [profileInputData, setProfileInputData] = useState({
        sponsor_name: "",
        state_id: "",
        address: "",
        latitude: null,
        longitude: null,
        zip_code: "",
        speciality: [],
        condition: [],
        brief_intro: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: "",
        listing_image: "",
    });

    console.log("specialityListAPI", specialityListAPI);
    console.log("profileSelector", profileSelector);

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
            setAddress(profileSelector.data.address)
            setProfileInputData({
                ...profileInputData,
                sponsor_name: profileSelector.data.sponsor_name,
                state_id: profileSelector.data.state_id,
                address: profileSelector.data.address,
                zip_code: profileSelector.data.zip_code,
                speciality: specialityListAPI,
                condition: conditionListAPI,
                brief_intro: profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.brief_intro : "",
                bank_name: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.bank_name : "",
                account_holder_name: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.account_holder_name : "",
                account_number: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.account_number : "",
                routing_number: profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail.routing_number : "",
                listing_image: profileSelector.data.listing_image
            });
        }
        return () => {
            setProfileInputData()
            conditionListAPI = []
            specialityListAPI = []
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
        setProfileInputData({ ...profileInputData, speciality: e, condition: [], })
        const speArr = e.map(value => value.value)
        let data = {
            speciality: speArr
        }

        ConditionsAction(data);
    }

    useEffect(() => {
        if(specialityListAPI.length > 0){
            const speArr = specialityListAPI.map(value => value.value)
            let data = {
                speciality: speArr
            }
    
            ConditionsAction(data);
        }
    }, [specialityListAPI])

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
                    toast.error("Only image with .jpeg, .jpg, .png extentions are valid.", { theme: "colored", autoClose: 5000});
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
                toast.error("Only image with .jpeg, .jpg, .png extentions are valid.", { theme: "colored", autoClose: 5000});
            }
        }
    }

    //form validation handler
    const validate = (values) => {
        if (!ALLOW_LETTERS_ONLY.test(values.sponsor_name)) {
            toast.error("The sponsor name must not contain numbers or special characters.", { theme: "colored", autoClose: 5000})
            return false;
        }
        return true;
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.value);
        const conditionArr = profileInputData.condition.map(value => value.value);
        let formDataObj = {}
        let formData = new FormData();
        if (binary !== undefined) {
            formData.append("profile_image", binary)
        }
        if (listingBinary !== undefined) {
            formData.append("listing_image", listingBinary)
        } else {
            formDataObj = {...formDataObj, listing_image_url: profileInputData.listing_image !== null ? profileInputData.listing_image : ""}
        }
        formDataObj = {...formDataObj, sponsor_name: profileInputData.sponsor_name}
        formDataObj = {...formDataObj, state_id: profileInputData.state_id}
        formDataObj = {...formDataObj, address: profileInputData.address}
        formDataObj = {...formDataObj, zip_code: profileInputData.zip_code}
        formDataObj = {...formDataObj, speciality: specialityArr}
        formDataObj = {...formDataObj, condition: conditionArr}
        formDataObj = {...formDataObj, brief_intro: profileInputData.brief_intro}
        formDataObj = {...formDataObj, bank_name: profileInputData.bank_name}
        formDataObj = {...formDataObj, account_holder_name: profileInputData.account_holder_name}
        formDataObj = {...formDataObj, account_number: profileInputData.account_number}
        formDataObj = {...formDataObj, routing_number: profileInputData.routing_number}
        if(profileInputData.latitude && profileInputData.longitude){
            formDataObj = {...formDataObj, latitude: profileInputData.latitude}
            formDataObj = {...formDataObj, longitude: profileInputData.longitude}
        }
        formData.append('body', Encryption(formDataObj));
        console.log("formDataObj", formDataObj);
        const isVaild = validate(profileInputData);
        if (isVaild) {
            dispatch(ProfileUpdateAction(formData, "sponsor"))
            setProfileSubmitClick(true)
        }
    }

    const handleListingRemove = () => {
        setListingBinary(undefined);
        setProfileInputData({ ...profileInputData, listing_image: null });
    }

    useEffect(() => {
        if (profileSubmitClick) {
            if (Object.keys(UpdateProfileSelector.profile_edit).length !== 0 && !UpdateProfileSelector.loading) {
                toast.success(UpdateProfileSelector.profile_edit.message, { theme: "colored", autoClose: 5000})
                history.push("/trial-sponsors/dashboard")
                dispatch(ProfileAction())
            } else if (Object.keys(UpdateProfileSelector.error).length !== 0 && !UpdateProfileSelector.loading) {
                toast.error(UpdateProfileSelector.error.message, { theme: "colored", autoClose: 5000})
                setProfileSubmitClick(false)
            }
        }
    }, [UpdateProfileSelector, profileSubmitClick, dispatch, history]);

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
                                                                    profileSelector.data.profile_image
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
                                                    name="sponsor_name"
                                                    onChange={onChange}
                                                    placeholder="Enter Sponsor Name"
                                                    defaultValue={profileSelector.data.sponsor_name}
                                                    labelText="Sponsor Name"
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
                                                    placeholder="Enter Phone Number"
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
                                                    type="text"
                                                    name="zip_code"
                                                    onChange={onChange}
                                                    placeholder="Enter zip code"
                                                    defaultValue={profileSelector.data.zip_code}
                                                    labelText="Zip Code"
                                                    required={true}
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
                                                            <img src={fullListingBinaryUrl} className='img-fluid' alt={profileInputData.sponsor_name} />
                                                            :
                                                            <img
                                                                src={profileInputData.listing_image && profileInputData.listing_image}
                                                                className='img-fluid'
                                                                alt={profileInputData.sponsor_name}
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
                                                <label> Condition <span className="text-danger"> *</span> </label>
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
                                                    labelText="Brief Intro"
                                                    onChange={onChange}
                                                    placeholder="Enter Brief Intro"
                                                    required={true}
                                                    name="brief_intro"
                                                    defaultData={profileSelector.data.user_meta_info.brief_intro}
                                                />
                                            </div>
                                        </div>

                                        <h2 className="section-title mt-4">Bank Details <small>(Optional)</small> </h2>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="bank_name"
                                                    onChange={onChange}
                                                    placeholder="Enter Bank Name"
                                                    labelText="Name of Bank"
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail?.bank_name : ""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="account_holder_name"
                                                    onChange={onChange}
                                                    placeholder="Enter Name"
                                                    labelText="Account Holder Name"
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail?.account_holder_name : ""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="account_number"
                                                    onChange={onChange}
                                                    placeholder="Enter Account Number"
                                                    labelText="Account Number"
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail?.account_number : ""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="routing_number"
                                                    onChange={onChange}
                                                    placeholder="Enter Routing Number"
                                                    labelText="Routing Number"
                                                    defaultValue={profileSelector.data.user_bank_detail !== null ? profileSelector.data.user_bank_detail?.routing_number : ""}
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            isButton="true"
                                            BtnType="submit"
                                            BtnColor="primary"
                                            BtnText="Save"
                                            hasSpinner={profileSubmitClick && UpdateProfileSelector.loading}
                                            disabled={profileSubmitClick && UpdateProfileSelector.loading}
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

export default SponsorsEditProfile;
