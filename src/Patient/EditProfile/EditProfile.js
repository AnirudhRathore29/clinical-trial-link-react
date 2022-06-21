import { useEffect, useState } from "react";
import { InputText, SelectBox } from "../../views/Components/Common/Inputs/Inputs";
import RadioBtn from "../../views/Components/Common/RadioBtn/RadioBtn";
import Button from "../../views/Components/Common/Buttons/Buttons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ChangePassword from "../../TrialSponsors/EditProfile/ChangePassword";
import { ProfileAction, ProfileUpdateAction } from "../../redux/actions/profileAction";
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { StatesAction } from "../../redux/actions/commonAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost, { getImageUrl } from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidPhoneNumber, isValidEmailAddress, isValidOnlyLetters, isValidZipcode, isValidAccountNumber, isValidRoutingNumber } from "./../../views/Components/Validation/Validation"
import moment from "moment";

toast.configure();
const conditionListAPI = []
const specialityListAPI = []
const PatientEditProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const dataSelector = useSelector(state => state.common_data)
    const profileSelector = useSelector(state => state.profile.data.data);
    const UpdateProfileSelector = useSelector(state => state.profile)

    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [binary, setBinary] = useState();
    const [fullBinaryUrl, setFullBinaryUrl] = useState();

    const [profileSubmitClick, setProfileSubmitClick] = useState(false);

    const [trialFor, setTrialFor] = useState(true)

    const [profileInputData, setProfileInputData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        state_id: "",
        zip_code: "",
        dob: null,
        address: "",
        gender: "M",
        trials_for: "Myself",
        speciality: [],
        condition: [],
        physician_fname: "",
        physician_lname: "",
        physician_email: "",
        physician_phone_number: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: "",
    });

    useEffect(() => {
        dispatch(ProfileAction())
        dispatch(StatesAction())
    }, [dispatch]);

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

            setProfileInputData({
                ...profileInputData,
                first_name: profileSelector.data.first_name,
                last_name: profileSelector.data.last_name,
                email: profileSelector.data.email,
                phone_number: profileSelector.data.phone_number,
                state_id: profileSelector.data.state_id,
                zip_code: profileSelector.data.zip_code,
                dob: new Date(profileSelector.data.dob),
                address: profileSelector.data.address,
                gender: profileSelector.data.gender,
                trials_for: profileSelector.data.user_meta_info.trials_for,
                speciality: specialityListAPI,
                condition: conditionListAPI,
                physician_fname: profileSelector.data.physician_fname,
                physician_lname: profileSelector.data.physician_lname,
                physician_email: profileSelector.data.physician_email,
                physician_phone_number: profileSelector.data.physician_phone_number,
                bank_name: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.bank_name : "",
                account_holder_name: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.account_holder_name : "",
                account_number: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.account_number : "",
                routing_number: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.routing_number : "",
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

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (e.target.name === "profile_image") {
            var output = document.getElementById("profileImage-upload");
            var binaryData = [];
            binaryData.push(files[0]);
            const extention = value.substr(value.lastIndexOf('.') + 1).toLowerCase();
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

    const trialsFor = () => {
        setTrialFor(!trialFor);
    }

    //form validation handler
    const Validation = (value) => {
        const isFirstNameVaild = isValidOnlyLetters(value.first_name, "first name")
        const isLastNameVaild = isValidOnlyLetters(value.last_name, "last name")
        const isZipcodeVaild = isValidZipcode(value.zip_code)
        const isBanknameVaild = isValidOnlyLetters(value.bank_name, "bank name")
        const isHoldernameVaild = isValidOnlyLetters(value.account_holder_name, "account holder name")
        const isAccountnumVaild = isValidAccountNumber(value.account_number)
        const isRoutingnumVaild = isValidRoutingNumber(value.routing_number)
        if (!isFirstNameVaild.status) {
            toast.error(isFirstNameVaild.message, { theme: "colored" })
            return false
        } else if (!isLastNameVaild.status) {
            toast.error(isLastNameVaild.message, { theme: "colored" })
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

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.value);
        const conditionArr = profileInputData.condition.map(value => value.value);
        let formData = new FormData();
        formData.append("first_name", profileInputData.first_name)
        formData.append("last_name", profileInputData.last_name)
        formData.append("email", profileInputData.email)
        formData.append("phone_number", profileInputData.phone_number)
        formData.append("state_id", profileInputData.state_id)
        formData.append("zip_code", profileInputData.zip_code)
        formData.append("dob", moment(profileInputData.dob).format("YYYY-MM-DD"))
        formData.append("address", profileInputData.address);
        formData.append("gender", profileInputData.gender)
        formData.append("trials_for", profileInputData.trials_for)
        formData.append("physician_fname", profileInputData.physician_fname)
        if (binary !== undefined) {
            formData.append("profile_image", binary)
        }
        for (let i = 0; i < specialityArr.length; i++) {
            formData.append(`speciality[${i}]`, specialityArr[i]);
        }
        for (let i = 0; i < conditionArr.length; i++) {
            formData.append(`condition[${i}]`, conditionArr[i]);
        }
        formData.append("physician_lname", profileInputData.physician_lname)
        formData.append("physician_email", profileInputData.physician_email)
        formData.append("physician_phone_number", profileInputData.physician_phone_number)
        formData.append("bank_name", profileInputData.bank_name)
        formData.append("account_holder_name", profileInputData.account_holder_name)
        formData.append("account_number", profileInputData.account_number)
        formData.append("routing_number", profileInputData.routing_number)

        const isVaild = Validation(profileInputData);
        if (isVaild) {
            dispatch(ProfileUpdateAction(formData, "patient"))
            setProfileSubmitClick(true)
        }
    }

    useEffect(() => {
        if (profileSubmitClick) {
            if (Object.keys(UpdateProfileSelector.profile_edit).length !== 0 && !UpdateProfileSelector.loading) {
                toast.success(UpdateProfileSelector.profile_edit.message, { theme: "colored" })
                history.push("/patient/dashboard")
            } else if (Object.keys(UpdateProfileSelector.error).length !== 0 && !UpdateProfileSelector.loading) {
                toast.error(UpdateProfileSelector.error.message, { theme: "colored" })
                setProfileSubmitClick(false)
            }
        }
    }, [UpdateProfileSelector, profileSubmitClick]);

    console.log("profileSelector", profileSelector)

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
                                                                referrerPolicy="no-referrer"
                                                                alt={profileSelector.data.sponsor_name}
                                                            />
                                                        : <img src="/images/avatar2.svg" className='img-fluid' alt={profileSelector.data.sponsor_name} />}
                                                    <span><box-icon type='solid' name='camera' color="#ffffff" size="18px"></box-icon></span>
                                                </label>
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="first_name"
                                                    onChange={onChange}
                                                    placeholder="First Name"
                                                    defaultValue={profileSelector.data.first_name}
                                                    labelText="First Name"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="last_name"
                                                    onChange={onChange}
                                                    placeholder="Last Name"
                                                    defaultValue={profileSelector.data.last_name}
                                                    labelText="Last Name"
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
                                                    placeholder="Phone Number"
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
                                                <InputText
                                                    type="text"
                                                    name="address"
                                                    onChange={onChange}
                                                    placeholder="Enter Address"
                                                    defaultValue={profileSelector.data.address}
                                                    labelText="Address"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="number"
                                                    name="zip_code"
                                                    onChange={onChange}
                                                    placeholder="Enter zip code"
                                                    defaultValue={profileSelector.data.zip_code}
                                                    labelText="Zip Code"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="col-lg-6 form-group">
                                                <label>Date Of Birth</label>
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
                                        </div>

                                        <h2 className="section-title mt-4">Other Info</h2>

                                        <div className="row">
                                            {/* <div className="col-lg-12 form-group">
                                                <label>Trials for</label>
                                                <div className="gender-row w-50 mt-4">
                                                    <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Myself" defaultChecked="true" onChange={trialsFor} />
                                                    <RadioBtn className="radio-btn" type="radio" name="trial_For" labelText="Family/Friends" onChange={trialsFor} />
                                                </div>
                                            </div> */}

                                            <div className="col-lg-12 form-group">
                                                <label>Trials for</label>
                                                <div className="gender-row mt-4">
                                                    <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="trials_for" value="Myself" labelText="Myself" defaultChecked="true" />
                                                    <RadioBtn className="radio-btn" onChange={onChange} type="radio" name="trials_for" value="Family_Or_Friends" labelText="Family/Friends" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 form-group">
                                                <label> Seeking Trials for </label>
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
                                        </div>
                                        {
                                            trialFor
                                                ?
                                                <>
                                                    <h2 className="section-title mt-4">Your Primary Physician Details</h2>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <InputText
                                                                type="text"
                                                                name="physician_fname"
                                                                onChange={onChange}
                                                                placeholder="First Name"
                                                                defaultValue={profileSelector.data.physician_fname}
                                                                labelText="First Name"
                                                            // required={true}
                                                            />
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <InputText
                                                                type="text"
                                                                name="physician_lname"
                                                                onChange={onChange}
                                                                placeholder="Last Name"
                                                                defaultValue={profileSelector.data.physician_lname}
                                                                labelText="Last Name"
                                                            // required={true}
                                                            />
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <InputText
                                                                type="email"
                                                                name="physician_email"
                                                                onChange={onChange}
                                                                placeholder="Email Address"
                                                                defaultValue={profileSelector.data.physician_email}
                                                                labelText="Email Address"
                                                            // required={true}
                                                            />
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <InputText
                                                                type="number"
                                                                name="physician_phone_number"
                                                                onChange={onChange}
                                                                placeholder="Phone Number"
                                                                defaultValue={profileSelector.data.physician_phone_number}
                                                                labelText="Phone Number"
                                                            // required={true}
                                                            />
                                                        </div>

                                                        <div className="col-12">
                                                            <div className='info-bx br-none'>
                                                                <box-icon type='solid' name='info-circle' color="#4096EE" size="22px"></box-icon> Optional for your Physician to Receive Notifications About your Participation in a Clinical Trial.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                null
                                        }

                                        <h2 className="section-title mt-4">Bank Details</h2>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="bank_name"
                                                    onChange={onChange}
                                                    placeholder="Enter Bank Name"
                                                    labelText="Name of Bank"
                                                    required={true}
                                                    defaultValue={profileSelector.data.user_bank_detail.bank_name}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="account_holder_name"
                                                    onChange={onChange}
                                                    placeholder="Enter Name"
                                                    labelText="Account Holder Name"
                                                    required={true}
                                                    defaultValue={profileSelector.data.user_bank_detail.account_holder_name}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="account_number"
                                                    onChange={onChange}
                                                    placeholder="Enter Account Number"
                                                    labelText="Account Number"
                                                    required={true}
                                                    defaultValue={profileSelector.data.user_bank_detail.account_number}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <InputText
                                                    type="text"
                                                    name="routing_number"
                                                    onChange={onChange}
                                                    placeholder="Enter Routing Number"
                                                    labelText="Routing Number"
                                                    required={true}
                                                    defaultValue={profileSelector.data.user_bank_detail.routing_number}
                                                />
                                            </div>

                                            <div className="col-lg-12">
                                                <div className='info-bx br-none p-0 mb-5'>
                                                    <box-icon type='solid' name='info-circle' color="#4096EE" size="22px"></box-icon> Optional for your Physician to Receive Notifications About your Participation in a Clinical Trial.
                                                </div>
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

export default PatientEditProfile;
