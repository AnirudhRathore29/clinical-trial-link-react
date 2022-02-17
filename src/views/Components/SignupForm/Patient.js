import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { InputText } from "../Common/Inputs/Inputs";
import Button from "../Common/Buttons/Buttons";
import RadioBtn from "../Common/RadioBtn/RadioBtn";

const Patient = () => {
    const history = useHistory();

    const [Formdata, setFormdata] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        password: "",
        confirm_password: "",
        t_c: "",
    });

    const SignUPSubmit = () => {
        console.log("Formdata", Formdata);
        history.push("/verify-email");
    };


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
    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <InputText
                        type="text"
                        name="name"
                        value={Formdata.first_name}
                        placeholder="Full Name"
                        required="required"
                        labelText="First Name"
                        onChange={(e) => {
                            setFormdata({ ...Formdata, first_name: e.target.value });
                        }}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type="text"
                        name="last_name"
                        value={Formdata.last_name}
                        placeholder="Last Name"
                        required="required"
                        labelText="Last Name"
                        onChange={(e) => {
                            setFormdata({ ...Formdata, last_name: e.target.value });
                        }}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type="email"
                        name="email"
                        value={Formdata.email}
                        placeholder="Email Address"
                        required="required"
                        labelText="Email"
                        onChange={(e) => {
                            setFormdata({ ...Formdata, email: e.target.value });
                        }}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type="number"
                        name="phone_no"
                        value={Formdata.phone_no}
                        placeholder="Phone Number"
                        required="required"
                        labelText="Phone Number"
                        onChange={(e) => {
                            setFormdata({ ...Formdata, phone_no: e.target.value });
                        }}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type={Password ? "text" : "password"}
                        name="password"
                        value={Formdata.password}
                        placeholder="Password"
                        required="required"
                        labelText="Password"
                        className="password-field"
                        onChange={(e) => {
                            setFormdata({ ...Formdata, password: e.target.value });
                        }}
                        isPassword="true"
                        onClick={ShowPassword}
                        ChangeClass={Password ? "show-hide active" : "show-hide"}
                    />
                </div>
                <div className="col-lg-6">
                    <InputText
                        type={confirmPassword ? "text" : "password"}
                        name="confirm_password"
                        value={Formdata.confirm_password}
                        placeholder="Confirm Password"
                        required="required"
                        labelText="Confirm Password"
                        className="password-field"
                        onChange={(e) => {
                            setFormdata({
                                ...Formdata,
                                confirm_password: e.target.value,
                            });
                        }}
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
                    name="t_c"
                    onChange={(e) => {
                        setFormdata({
                            ...Formdata,
                            t_c: e.target.value,
                        });
                    }}
                    labelText={<p>I agree to the <Link to="/">Terms &amp; Conditions</Link> of Clinic Trial Link. <span className="text-danger">*</span></p>}
                />
            </div>
            <div className="form-group text-center">
                <Button
                    isButton="true"
                    BtnType="submit"
                    BtnColor="green w-50"
                    BtnText="Sign Up"
                    onClick={SignUPSubmit}
                />
            </div>
        </>
    )
}

export default Patient;