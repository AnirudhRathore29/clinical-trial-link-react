import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import CommonButton from "../../Components/Common/Buttons/Buttons";
import "../Login/Login.css";

const SignUp = () => {
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
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Register</h1>
                        <p>A few clicks away from Creating your account</p>
                    </div>
                    <div className="authentication-bx sign-up-authentication">
                        <form autoComplete="off">
                            <div className="selectUserType">
                                <label>
                                    <input type="radio" name="use_type" defaultChecked="checked" />
                                    <span>
                                        <img src="/images/patient.svg" alt="Patient" />
                                        <h2>Patient</h2>
                                        <i></i>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="use_type" />
                                    <span>
                                        <img src="/images/trial-clinic.svg" alt="Patient" />
                                        <h2>Trial Clinic</h2>
                                        <i></i>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="use_type" />
                                    <span>
                                        <img src="/images/physician.svg" alt="Patient" />
                                        <h2>Physician</h2>
                                        <i></i>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="use_type" />
                                    <span>
                                        <img src="/images/pharma-companies.svg" alt="Patient" />
                                        <h2>Pharmaceutical Companies</h2>
                                        <i></i>
                                    </span>
                                </label>
                            </div>
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
                                <div className="form-checkbox">
                                    <div className="custom-check-block">
                                        <input
                                            type="checkbox"
                                            name="t_c"
                                            defaultChecked={""}
                                            onChange={(e) => {
                                                setFormdata({
                                                    ...Formdata,
                                                    t_c: e.target.value,
                                                });
                                            }}
                                            className="d-none"
                                            id="remember"
                                            defaultValue="Remember me"
                                            required
                                        />
                                        <label htmlFor="remember" className="custom-check-label">
                                            <span className="text-danger">*</span> I agree to the{" "}
                                            <Link to="/">Terms &amp; Conditions</Link> of MsingiPack
                                            Cloud.{" "}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <CommonButton
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-50"
                                    BtnText="Sign Up"
                                    onClick={SignUPSubmit}
                                />
                            </div>
                            <p className="create-account">
                                Already have any account? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
