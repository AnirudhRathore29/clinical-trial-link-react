import React, { useEffect, useState } from "react";
import { InputText, SelectBox } from "../../views/Components/Common/Inputs/Inputs";
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

const PatientCompleteProfile = (props) => {
    const dispatch = useDispatch();
    const dataSelector = useSelector(state => state.common_data)
    const [selectSpeciality, setSelectSpeciality] = useState([]);
    const [selectCondition, setSelectCondition] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    // const [Formdata, setFormdata] = useState({
    //     state: "",
    //     zip_code: "",
    //     date_of_birth: "",
    //     gender: "",
    //     bank_name: "",
    //     account_holder_name: "",
    //     account_holder_name: "",
    //     t_c: "",
    // });

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(getCurrentHost() + "/get-clinical-specialities", requestOptions)
            .then(data => data.json())
            .then((response) => {
                console.log("response.data", response.data)
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

    useEffect(() => {
        SpecialitiesAction()
    }, [])


    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        dispatch(StatesAction())
    }, [])

    const CompleteProfileSubmit = () => {
        props.history.push('/patient/dashboard')
    }

    console.log("specialityList", selectSpeciality)
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
                                        name="zip_code"
                                        placeholder="Enter zip code"
                                        labelText="Zip Code"
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label>Date Of Birth</label>
                                    <DatePicker name="dob" className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" value="M" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" value="F" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" value="NB" />
                                    </div>
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
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_holder_name"
                                        placeholder="Enter Name"
                                        labelText="Account Holder Name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                    />
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Trial Information</h2>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Seeking Trials for </label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={selectSpeciality}
                                            onChange={setSelectSpeciality}
                                            disableSearch={true}
                                            labelledBy="Seeking Trials for"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label> Mental Health Condition </label>
                                        <MultiSelect
                                            options={[
                                                { label: "Grapes 🍇", value: "grapes" },
                                                { label: "Mango 🥭", value: "mango" }
                                            ]}
                                            value={selectCondition}
                                            onChange={setSelectCondition}
                                            disableSearch={true}
                                            labelledBy="Seeking Trials for"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>Trials for</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="trial_For" value="Myself" labelText="Myself" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="trial_For" value="Family_Or_Friends" labelText="Family/Friends" />
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3 mb-3">
                                    <h2>Share Your Physician Details <small>(if any)</small></h2>
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="physician_fname"
                                        placeholder="First Name"
                                        labelText="First Name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="text"
                                        name="physician_lname"
                                        placeholder="Last Name"
                                        labelText="Last Name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="email"
                                        name="physician_email"
                                        placeholder="Enter Email"
                                        labelText="Email"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputText
                                        type="number"
                                        name="physician_phone_number"
                                        placeholder="Enter Phone Number"
                                        labelText="Phone Number"
                                    />
                                </div>

                                <div className="mt-5 text-center">
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="green w-50"
                                        BtnText="Finish"
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
