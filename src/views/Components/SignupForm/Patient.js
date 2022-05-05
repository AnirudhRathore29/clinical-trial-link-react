import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { InputText } from "../Common/Inputs/Inputs";
import Button from "../Common/Buttons/Buttons";
import RadioBtn from "../Common/RadioBtn/RadioBtn";
import { SignupAction } from "./../../../redux/actions/authAction"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Patient = (props) => {
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
                toast.success(patientSelector.auth.user.data.message, { theme: "colored" })
                history.push({
                	pathname: '/verify-email',
                	state: patientSelector.auth.user.data.data
                });
            } else if(Object.keys(patientSelector.auth.error).length !== 0 && patientSelector.auth.loading === false){
                let err = patientSelector.auth?.error?.message;
                toast.error(err, { theme: "colored" });
            }
        }
    }, [patientSelector, submitClick, history]);

    const onChange = (e) => {
        const { name, checked, value } = e.target;
        if (name === "T_C") {
            setFormdata((preValue) => {
                return {
                    ...preValue,
                    [name]: checked
                };
            });
        } else {
            setFormdata((preValue) => {
                return {
                    ...preValue,
                    [name]: value
                };
            });
        }
    };

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
        setSubmitClick(true)
        dispatch(SignupAction(regData))
    };
    return (
        <Form onSubmit={handleSignUPSubmit} autoComplete="off">
            <div className="row">
                <div className="col-lg-6">
                    <InputText
                        type="text"
                        name="first_name"
                        defaultValue={Formdata.first_name}
                        placeholder="Full Name"
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