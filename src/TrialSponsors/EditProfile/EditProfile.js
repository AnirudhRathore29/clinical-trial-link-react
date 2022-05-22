import { useEffect, useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import "react-datepicker/dist/react-datepicker.css";
import "../../views/pages/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import { ProfileAction } from "../../redux/actions/profileAction";
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { StatesAction } from "../../redux/actions/commonAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const SponsorsEditProfile = () => {
    const dispatch = useDispatch();
    const dataSelector = useSelector(state => state.common_data)
    const profileSelector = useSelector(state => state.profile.data.data);

    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [binary, setBinary] = useState();
    const [fullBinaryUrl, setFullBinaryUrl] = useState();
    const [profileInputData, setProfileInputData] = useState({
        sponsor_name: "",
        phone_number: "",
        state_id: "",
        address: "",
        zip_code: "",
        user_speciality: [],
        user_condition: [],
        brief_intro: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: ""
    });

    useEffect(() => {
        dispatch(ProfileAction())
        dispatch(StatesAction())
    }, [dispatch])

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
        setProfileInputData({ ...profileInputData, user_speciality: e })
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
            const extention = value.split(".")[1];
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

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        // let formData = new FormData();
        // formData.append("profile_image", binary);
        // formData.append("id", profileEditDetails.id);
        // formData.append("firstName", editInput.firstName);
        // formData.append("lastName", editInput.lastName);
        // formData.append("email", editInput.email);
        // formData.append("dob", editInput.dob);
        // formData.append("state_id", editInput.state_id);
        // props.updateUserProfile(formData);
    }

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
                                                                    getCurrentHost() + "/" + profileSelector.data.profile_image
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
                                                    type="number"
                                                    name="phone_no"
                                                    onChange={onChange}
                                                    defaultValue={profileSelector.data.phone_number}
                                                    placeholder="Enter Phone Number"
                                                    labelText="Phone Number"
                                                    required={true}
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
                                        <h2 className="section-title mt-4">Other Info</h2>
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label> Specialty </label>
                                                <MultiSelect
                                                    options={specialityList !== undefined && specialityList}
                                                    value={profileInputData.user_speciality}
                                                    onChange={specialityOnChange}
                                                    disableSearch={true}
                                                    labelledBy="Specialty"
                                                    className="multiSelect-control"
                                                    name="user_speciality"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label> Condition </label>
                                                <MultiSelect
                                                    options={conditionList !== undefined && conditionList}
                                                    value={profileInputData.user_condition}
                                                    onChange={(e) => setProfileInputData({ ...profileInputData, user_condition: e })}
                                                    disableSearch={true}
                                                    labelledBy="Condition"
                                                    className="multiSelect-control"
                                                    name="user_condition"
                                                />
                                            </div>
                                            <div className="col-lg-12">
                                                <TextArea
                                                    labelText="Brief Intro"
                                                    onChange={onChange}
                                                    placeholder="Enter Brief Intro"
                                                    required={true}
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
                                        </div>
                                        <Button
                                            isButton="true"
                                            BtnType="submit"
                                            BtnColor="primary"
                                            BtnText="Save"
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
