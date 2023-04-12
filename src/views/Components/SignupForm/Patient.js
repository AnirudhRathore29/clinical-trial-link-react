import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { InputText, SelectBox, TextArea } from "../Common/Inputs/Inputs";
import Button from "../Common/Buttons/Buttons";
import RadioBtn from "../Common/RadioBtn/RadioBtn";
import { SignupAction } from "./../../../redux/actions/authAction"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidPhoneNumber, isValidEmailAddress, isValidOnlyLetters, isValidPassword } from "./../../Components/Validation/Validation"

// toast.configure();
const Patient = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const patientSelector = useSelector(state => state)
    const [submitClick, setSubmitClick] = useState(false);
    const [Formdata, setFormdata] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        T_C: "",
    });

    /* Password show hide */
    const [Password, SetPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);

    const ShowPassword = () => {
        SetPassword(!Password);
    };
    const ShowConfirmPassword = () => {
        SetConfirmPassword(!confirmPassword);
    };
    /* Password show hide */

    useEffect(() => {
        if (submitClick === true) {
            if (Object.keys(patientSelector.auth.user).length !== 0 && patientSelector.auth.loading === false) {
                toast.success(patientSelector.auth.user.data.message, { theme: "colored", autoClose: 5000})
                history.push({
                    pathname: '/verify-email',
                    state: patientSelector.auth.user.data.data
                });
            } else if (Object.keys(patientSelector.auth.error).length !== 0 && patientSelector.auth.loading === false) {
                let err = patientSelector.auth?.error?.message;
                toast.error(err, { theme: "colored", autoClose: 5000});
            }
        }
    }, [patientSelector, submitClick, history]);

    const onChange = (e) => {
        const { name, checked, value } = e.target;
        const changeValue = name === "T_C" ? checked : value
        setFormdata((preValue) => {
            return {
                ...preValue,
                [name]: changeValue
            };
        });
    };

    const Vaildation = (value) => {
        const isPhoneVaild = isValidPhoneNumber(value.phone_number)
        const isEmailVaild = isValidEmailAddress(value.email)
        const isFirstNameVaild = isValidOnlyLetters(value.first_name, "first name")
        const isLastNameVaild = isValidOnlyLetters(value.last_name, "last name")
        const isPasswordVaild = isValidPassword(value.password)
        if (!isFirstNameVaild.status) {
            toast.error(isFirstNameVaild.message, { theme: "colored", autoClose: 5000})
            return false
        } else if (!isLastNameVaild.status) {
            toast.error(isLastNameVaild.message, { theme: "colored", autoClose: 5000})
            return false
        } else if (!isEmailVaild.status) {
            toast.error(isEmailVaild.message, { theme: "colored", autoClose: 5000})
            return false
        } else if (!isPhoneVaild.status) {
            toast.error(isPhoneVaild.message, { theme: "colored", autoClose: 5000})
            return false
        } else if (!isPasswordVaild.status) {
            toast.error(isPasswordVaild.message, { theme: "colored", autoClose: 5000})
            return false
        }
        return true
    }

    const handleSignUPSubmit = (event) => {
        event.preventDefault();
        const regData = {
            role: "2",
            first_name: Formdata.first_name,
            last_name: Formdata.last_name,
            email: Formdata.email,
            phone_number: Formdata.phone_number,
            password: Formdata.password,
            confirm_password: Formdata.confirm_password,
            T_C: Formdata.T_C
        }
        const isVaild = Vaildation(regData)
        if (isVaild) {
            setSubmitClick(true)
            dispatch(SignupAction(regData))
        }
    };

    return (
        <Form onSubmit={handleSignUPSubmit} autoComplete="off">
            <div className="row">
                <div className="col-lg-6">
                    <InputText
                        type="text"
                        name="first_name"
                        defaultValue={Formdata.first_name}
                        placeholder="First Name"
                        required="required"
                        labelText="First Name"
                        onChange={onChange}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type="text"
                        name="last_name"
                        defaultValue={Formdata.last_name}
                        placeholder="Last Name"
                        required="required"
                        labelText="Last Name"
                        onChange={onChange}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type="email"
                        name="email"
                        defaultValue={Formdata.email}
                        placeholder="Email Address"
                        required="required"
                        labelText="Email"
                        onChange={onChange}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type="number"
                        name="phone_number"
                        defaultValue={Formdata.phone_number}
                        placeholder="Phone Number"
                        required="required"
                        labelText="Phone Number"
                        onChange={onChange}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type={Password ? "text" : "password"}
                        name="password"
                        defaultValue={Formdata.password}
                        placeholder="Password"
                        required="required"
                        labelText="Password"
                        className="password-field"
                        onChange={onChange}
                        isPassword="true"
                        onClick={ShowPassword}
                        ChangeClass={Password ? "show-hide active" : "show-hide"}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type={confirmPassword ? "text" : "password"}
                        name="confirm_password"
                        defaultValue={Formdata.confirm_password}
                        placeholder="Confirm Password"
                        required="required"
                        labelText="Confirm Password"
                        className="password-field"
                        onChange={onChange}
                        isPassword="true"
                        onClick={ShowConfirmPassword}
                        ChangeClass={
                            confirmPassword ? "show-hide active" : "show-hide"
                        }
                    />
                </div>
            </div>

            <div className="forgot-link">
                <RadioBtn
                    className="checkbox-btn"
                    type="checkbox"
                    name="T_C"
                    onChange={onChange}
                    labelText={<p>I agree to the <Link to="/">Terms &amp; Conditions</Link> of Clinic Trial Link. <span className="text-danger">*</span></p>}
                />
            </div>

            <div className="form-group text-center">
                <Button
                    isButton="true"
                    BtnType="submit"
                    BtnColor="green w-50"
                    BtnText="Sign Up"
                    hasSpinner={patientSelector.auth.loading}
                    disabled={patientSelector.auth.loading}
                />
            </div>
        </Form>
    )
}

export default Patient;