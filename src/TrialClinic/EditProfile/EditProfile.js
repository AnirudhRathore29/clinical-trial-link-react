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
import { authHeader } from "../../redux/actions/authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../TrialSponsors/EditProfile/Profile.css"
const conditionListAPI = []
const specialityListAPI = []
const sponsorUploadedDoc = []
const ClinicEditProfile = () => {
    const dispatch = useDispatch();
    const dataSelector = useSelector(state => state.common_data)
    const profileSelector = useSelector(state => state.profile.data.data);
    const profileUploadSelector = useSelector(state => state.profile);

    const [CPSubmitClick, setCPSubmitClick] = useState(false);
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
    const [profileInputData, setProfileInputData] = useState({
        clinic_name: "",
        phone_number: "",
        state_id: "",
        address: "",
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
        user_document: []
    });

    useEffect(() => {
        dispatch(ProfileAction())
        dispatch(StatesAction())
    }, [dispatch])

    useEffect(() => {
        if (profileSelector !== undefined) {
            let speciality_data = profileSelector.data.user_speciality;
            let conditionList_data = profileSelector.data.user_condition;

            console.log("speciality_data", speciality_data)
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

            setProfileInputData({
                ...profileInputData,
                clinic_name: profileSelector.data.clinic_name,
                state_id: profileSelector.data.state_id,
                address: profileSelector.data.address,
                zip_code: profileSelector.data.zip_code,
                speciality: specialityListAPI,
                condition: conditionListAPI,
                brief_intro: profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.brief_intro : "",
                principal_investigator_name: profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.principal_investigator_name : "",
                principal_investigator_email: profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.principal_investigator_email : "",
                principal_investigator_brief_intro: profileSelector.data.user_meta_info !== undefined ? profileSelector.data.user_meta_info.principal_investigator_brief_intro : "",
                bank_name: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.bank_name : "",
                account_holder_name: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.account_holder_name : "",
                account_number: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.account_number : "",
                routing_number: profileSelector.data.user_bank_detail !== undefined ? profileSelector.data.user_bank_detail.routing_number : "",
                listing_image: profileSelector.data.listing_image,
                user_document: sponsorUploadedDoc
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

    const totalFiles = 4;
    const uploadSponsorFileHandler = async (e) => {
        const files = e.target.files;
        if (files.length > 0 && files.length <= totalFiles) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                let arr = {
                    file_type: files[i].name.substr(files[i].name.lastIndexOf('.') + 1),
                    file_name: files[i].name.split("." + files[i].name.substr(files[i].name.lastIndexOf('.') + 1))[0]
                }

                //setUploadedFileURLs(uploadedFileURLs => [...uploadedFileURLs, arr]);

                setProfileInputData({ ...profileInputData, user_document: [...profileInputData.user_document, arr] });
                uploadedFile.push(files[i])
                setUploadFile(uploadedFile);
            }
        } else (
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
            // Max. {totalFiles} files you can upload.
        )
        e.target.value = null;
    }

    const handleRemoveFile = (item) => {
        //setProfileInputData({ ...profileInputData, user_document.filter(el => el.file_name !== item.file_name) });
    }

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.id);
        const conditionArr = profileInputData.condition.map(value => value.id);
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
        for (let i = 0; i < specialityArr.length; i++) {
            formData.append(`speciality[${i}]`, specialityArr[i]);
        }
        for (let j = 0; j < conditionArr.length; j++) {
            formData.append(`condition[${j}]`, conditionArr[j]);
        }
        for (let t = 0; t < uploadedFile.length; t++) {
            formData.append(`user_document[${t}]`, uploadedFile[t]);
        }

        
        setCPSubmitClick(false)
        // user_document, listing_image
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
                                                <InputText
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Address"
                                                    labelText="Address"
                                                    onChange={onChange}
                                                    required={true}
                                                    defaultValue={profileSelector.data.address}
                                                />
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
                                                    <input type="file" id="uploadClinic-input" className='d-none' hidden="" name="documents" accept=".doc,.pdf,.docx" multiple onChange={uploadSponsorFileHandler} max={totalFiles} />
                                                    <div>
                                                        <h4>File Name Here </h4>
                                                        <h3>Tap here to upload your new file</h3>
                                                    </div>
                                                </label>
                                            </div>

                                            {profileInputData.user_document?.map((value, index) => {
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
                                                    <input name="hide_principal_investigator_details" type="checkbox" onChange={handleHidePrincipalInvestigator} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </h2>

                                        {console.log("profileSelector", profileSelector)}

                                        {profileSelector.data.user_meta_info !== null &&
                                            <div className={hidePrincipalInvestigator ? "sharing-disable row" : "row"}>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="principal_investigator_name"
                                                        placeholder="Enter Name"
                                                        labelText="Name"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_meta_info.principal_investigator_name}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="email"
                                                        name="principal_investigator_email"
                                                        placeholder="Enter email"
                                                        labelText="Email"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_meta_info.principal_investigator_email}
                                                    />
                                                </div>
                                                <div className="col-lg-12">
                                                    <TextArea
                                                        placeholder="Enter Brief Intro"
                                                        labelText="Brief Intro"
                                                        onChange={onChange}
                                                        name="principal_investigator_brief_intro"
                                                        defaultData={profileSelector.data.user_meta_info.principal_investigator_brief_intro}
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
                                                    <input type="checkbox" name="hide_bank_details" onChange={handleHideBankDetail} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </h2>
                                        {profileSelector.data.user_bank_detail !== null &&
                                            <div className={hideBankDetails ? "sharing-disable row" : "row"}>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="bank_name"
                                                        placeholder="Enter Bank Name"
                                                        labelText="Name of Bank"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_bank_detail.bank_name}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="account_holder_name"
                                                        placeholder="Enter Name"
                                                        labelText="Account Holder Name"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_bank_detail.account_holder_name}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="account_number"
                                                        placeholder="Enter Account Number"
                                                        labelText="Account Number"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_bank_detail.account_number}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <InputText
                                                        type="text"
                                                        name="routing_number"
                                                        placeholder="Enter Routing Number"
                                                        labelText="Routing Number"
                                                        onChange={onChange}
                                                        defaultValue={profileSelector.data.user_bank_detail.routing_number}
                                                    />
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className='info-bx br-none p-0 mb-5'>
                                                        <box-icon type='solid' name='info-circle' color="#4096EE" size="22px"></box-icon> Receive payments from the sponsor
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <Button
                                            isButton="true"
                                            BtnType="submit"
                                            BtnColor="primary"
                                            BtnText="Save"
                                            hasSpinner={CPSubmitClick && profileUploadSelector.loading}
                                            disabled={CPSubmitClick && profileUploadSelector.loading}
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
