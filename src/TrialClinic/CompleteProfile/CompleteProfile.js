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

toast.configure();
const ClinicCompleteProfile = (props) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const dataSelector = useSelector(state => state.common_data)
    const profileComSelector = useSelector(state => state.profile);
    const totalFiles = 10;
    const [uploadedFile, setUploadFile] = useState([]);
    const [uploadedFileURLs, setUploadedFileURLs] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [CPSubmitClick, setCPSubmitClick] = useState(false);
    const [profileInputData, setProfileInputData] = useState({
        clinic_name: "",
        speciality: [],
        condition: [],
        state_id: "",
        address: "",
        zip_code: "",
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

    const specialityOnChange = (e) => {
        setProfileInputData({ ...profileInputData, speciality: e })
        const speArr = e.map(value => value.id)
        let data = {
            speciality: speArr
        }
        ConditionsAction(data);
    }

    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files?.length > 0 && files?.length <= totalFiles) {
            for (let i = 0; i < files.length; i++) {
                const { name, type } = files[i];

                const fileParams = {
                    key: name.includes('.') ? name.substring(0, name.indexOf('.')) : name,
                    extension: type.includes('/') ? type.substring(type.indexOf('/') + 1) : type
                };

                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.addEventListener('load', (e) => {
                    const data = e.target.result;
                    uploadedFileURLs.push({
                        url: data,
                        file_type: fileParams.extension,
                        file_name: files[i].name
                    })
                    setUploadedFileURLs(uploadedFileURLs);
                    // console.log("uploadedFileURLs", uploadedFileURLs)
                })
                uploadedFile.push(files[i])
                setUploadFile(uploadedFile);
                // console.log("fileParams", fileParams)
                // console.log("files[i]", files[i])
            }
        }
    }

    useEffect(() => {
        if (CPSubmitClick === true) {
            console.log("profileComSelector", profileComSelector)
            if (Object.keys(profileComSelector.data).length !== 0 && profileComSelector.loading === false) {
                toast.success(profileComSelector.data.data.message, { theme: "colored" })
                // history.push("/trial-clinic/dashboard");
            } else if (Object.keys(profileComSelector.error).length !== 0 && profileComSelector.loading === false) {
                let err = profileComSelector.error.message;
                toast.error(err, { theme: "colored" });
                setCPSubmitClick(false)
            }
        }
    }, [CPSubmitClick, profileComSelector, history])

    const CompleteProfileSubmit = (e) => {
        e.preventDefault();
        const specialityArr = profileInputData.speciality.map(value => value.id);
        const conditionArr = profileInputData.condition.map(value => value.id);

        let formData = new FormData();
        formData.append("clinic_name", profileInputData.clinic_name);
        formData.append("speciality", JSON.stringify(specialityArr));
        formData.append("condition", JSON.stringify(conditionArr));
        formData.append("state_id", profileInputData.state_id);
        formData.append("address", profileInputData.address);
        formData.append("zip_code", profileInputData.zip_code);
        formData.append("principal_investigator_name", profileInputData.principal_investigator_name);
        formData.append("principal_investigator_email", profileInputData.principal_investigator_email);
        formData.append("principal_investigator_brief_intro", profileInputData.principal_investigator_brief_intro);
        formData.append("documents", uploadedFile);
        formData.append("bank_name", profileInputData.bank_name);
        formData.append("account_holder_name", profileInputData.account_holder_name);
        formData.append("account_number", profileInputData.account_number);
        formData.append("routing_number", profileInputData.routing_number);
        dispatch(TrialClinicCompleteProfileAction(formData))
        setCPSubmitClick(true)


        // console.log(JSON.parse(formData.getAll("speciality")))

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
                                <div className="col-lg-12 form-group">
                                    <label>Upload Clinic Document</label>
                                    <label className="upload-document">
                                        <input type="file" name="documents" accept=".doc,.pdf,.docx" multiple onChange={handleFileUpload} />
                                        <div>
                                            <h4>No File Uploaded</h4>
                                            <h3>Tap Here to Upload your File</h3>
                                        </div>
                                    </label>
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
                                        hasSpinner={profileComSelector.loading}
                                        disabled={profileComSelector.loading}
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
