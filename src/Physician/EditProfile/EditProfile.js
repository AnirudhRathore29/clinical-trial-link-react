import { useEffect, useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import DatePicker from "react-datepicker";
import RadioBtn from "../../views/Components/Common/RadioBtn/RadioBtn";
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAction, ProfileUpdateAction } from "../../redux/actions/profileAction";
import { isValidOnlyLetters, isValidZipcode } from "../../views/Components/Validation/Validation";
import moment from "moment";
import { StatesAction } from "../../redux/actions/commonAction";
import { useHistory } from "react-router-dom";
import ChangePassword from "../../TrialSponsors/EditProfile/ChangePassword";
import { LogoLoader } from "../../views/Components/Common/LogoLoader/LogoLoader";
import { getImageUrl } from "../../redux/constants";

toast.configure();

const PhysicianEditProfile = () => {

    const dataSelector = useSelector(state => state.common_data)
    const profileSelector = useSelector(state => state.profile.data.data);
    const UpdateProfileSelector = useSelector(state => state.profile)

    const [Password, SetPassword] = useState(false);
    const [oldPassword, SetOldPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [profileSubmitClick, setProfileSubmitClick] = useState(false);
    const [binary, setBinary] = useState();
    const [fullBinaryUrl, setFullBinaryUrl] = useState();
    const [profileInputData, setProfileInputData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        // phone_number: "",
        state_id: "",
        zip_code: "",
        dob: null,
        gender: "M",
        brief_intro: ""
    });

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(ProfileAction())
        dispatch(StatesAction())
    }, [dispatch]);

    useEffect(() => {
        if (profileSelector !== undefined) {
            setProfileInputData({
                ...profileInputData,
                first_name: profileSelector.data.first_name,
                last_name: profileSelector.data.last_name,
                email: profileSelector.data.email,
                phone_number: profileSelector.data.phone_number,
                state_id: profileSelector.data.state_id,
                zip_code: profileSelector.data.zip_code,
                dob: new Date(profileSelector.data.dob),
                gender: profileSelector.data.gender,
            });
        }

        return () => {
            setProfileInputData()
        }
    }, [profileSelector])

    console.log("profileSelector", profileSelector);
    console.log("UpdateProfileSelector", UpdateProfileSelector);

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

    //form validation handler
    const Validation = (value) => {
        const isFirstNameVaild = isValidOnlyLetters(value.first_name, "first name")
        const isLastNameVaild = isValidOnlyLetters(value.last_name, "last name")
        const isZipcodeVaild = isValidZipcode(value.zip_code)
        if (!isFirstNameVaild.status) {
            toast.error(isFirstNameVaild.message, { theme: "colored" })
            return false
        } else if (!isLastNameVaild.status) {
            toast.error(isLastNameVaild.message, { theme: "colored" })
            return false
        } else if (!isZipcodeVaild.status) {
            toast.error(isZipcodeVaild.message, { theme: "colored" })
            return false
        }
        return true
    }

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("first_name", profileInputData.first_name)
        formData.append("last_name", profileInputData.last_name)
        formData.append("email", profileInputData.email)
        // formData.append("phone_number", profileInputData.phone_number)
        formData.append("state_id", profileInputData.state_id)
        formData.append("zip_code", profileInputData.zip_code)
        formData.append("dob", moment(profileInputData.dob).format("YYYY-MM-DD"))
        formData.append("gender", profileInputData.gender)
        formData.append("brief_intro", profileInputData.brief_intro)
        if (binary !== undefined) {
            formData.append("profile_image", binary)
        }
        const isVaild = Validation(profileInputData);
        if (isVaild) {
            dispatch(ProfileUpdateAction(formData, "physician"))
            setProfileSubmitClick(true)
        }
    }

    useEffect(() => {
        if (profileSubmitClick) {
            if (Object.keys(UpdateProfileSelector.profile_edit).length !== 0 && !UpdateProfileSelector.loading) {
                toast.success(UpdateProfileSelector.profile_edit.message, { theme: "colored" })
                history.push("/physician/dashboard")
                dispatch(ProfileAction())
            } else if (Object.keys(UpdateProfileSelector.error).length !== 0 && !UpdateProfileSelector.loading) {
                toast.error(UpdateProfileSelector.error.message, { theme: "colored" })
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
                                                    <RadioBtn
                                                        className="radio-btn"
                                                        onChange={onChange}
                                                        type="radio"
                                                        name="gender"
                                                        labelText="Male"
                                                        value="M"
                                                        defaultChecked={profileSelector.data.gender === "M"}
                                                    />

                                                    <RadioBtn
                                                        className="radio-btn"
                                                        onChange={onChange}
                                                        type="radio"
                                                        name="gender"
                                                        labelText="Female"
                                                        value="F"
                                                        defaultChecked={profileSelector.data.gender === "F"}
                                                    />

                                                    <RadioBtn
                                                        className="radio-btn"
                                                        onChange={onChange}
                                                        type="radio"
                                                        name="gender"
                                                        labelText="Nonbinary"
                                                        value="NB"
                                                        defaultChecked={profileSelector.data.gender === "NB"}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <TextArea
                                                    placeholder="Enter Brief Intro"
                                                    labelText="Brief Intro"
                                                    onChange={onChange}
                                                    name="brief_intro"
                                                    defaultData={profileSelector.data.brief_intro}
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

export default PhysicianEditProfile;
