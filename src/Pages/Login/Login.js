import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import CommonButton from "../../Components/Common/Buttons/Buttons";
import "./Login.css";

const Login = () => {
    const [loginFieldData, setLoginFieldData] = useState({
        email: "",
        password: "",
    });

    /* password show hide */
    const [Password, SetPassword] = useState(false);
    const ShowPassword = () => {
        SetPassword(!Password);
    };
    /* password show hide */

    return (
        <>
            <section className="hero-section authentication-banner">
                <div className="container-fluid">
                    <SectionTitle
                        CustomClass="text-center pad-b-30"
                        title="Login"
                        ShapeImage="heading-clip-1.svg"
                        SubHeading={<p className="what-sec-text">Welcome back, please login <br/> to your account.</p>}
                    />
                    <div className="authentication-bx">
                        <InputText
                            type="email"
                            value={loginFieldData.name}
                            name="email"
                            placeholder="Email Address"
                            onChange={(e) => {
                                setLoginFieldData({ ...loginFieldData, email: e.target.value });
                            }}
                        />
                        <InputText
                            type={Password ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            FormGroupClass="hasicon"
                            value={loginFieldData.password}
                            isPassword="true"
                            onChange={(e) => {
                                setLoginFieldData({
                                    ...loginFieldData,
                                    password: e.target.value,
                                });
                            }}
                            onClick={ShowPassword}
                            ChangeClass={Password ? "show-hide active" : "show-hide"}
                        />

                        <div className="forgot-link">
                            <div className="form-checkbox">
                                <div className="custom-check-block">
                                    <input
                                        type="checkbox"
                                        className="d-none"
                                        id="remember"
                                        name="remember"
                                        defaultValue="Remember me"
                                    />
                                    <label className="custom-check-label" htmlFor="remember">
                                        {" "}
                                        Remember me{" "}
                                    </label>
                                </div>
                            </div>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <div className="form-group text-center">
                            <CommonButton
                                isButton="true"
                                BtnType="submit"
                                BtnColor="green w-100"
                                BtnText="Login"
                                onClick={Login}
                            />
                        </div>
                        <p className="create-account">
                            Don't have any account? <Link to="/sign-up">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
