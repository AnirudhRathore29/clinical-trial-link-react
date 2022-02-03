import { useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import Button from "../../Components/Common/Buttons/Buttons";
import "./Login.css";

const Login = () => {
    const [loginFieldData, setLoginFieldData] = useState({
        email: "",
        password: "",
    });

    const LoginSubmit = () => {
        console.log("loginfeild data", loginFieldData);
    }

    /* password show hide */
    const [Password, SetPassword] = useState(false);
    const ShowPassword = () => {
        SetPassword(!Password);
    };
    /* password show hide */

    return (
        <>
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        {/* <img src="/images/clinical-icon.svg" alt="icon" /> */}
                        <h1>Login</h1>
                        <p>Welcome back, please login to your account</p>
                    </div>
                    <div className="authentication-bx">
                        <form action="" autoComplete="off">
                            <InputText
                                type="email"
                                value={loginFieldData.name}
                                name="email"
                                placeholder="Email Address"
                                onChange={(e) => {
                                    setLoginFieldData({ ...loginFieldData, email: e.target.value });
                                }}
                                labelText="Email"
                            />
                            <InputText
                                type={Password ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={loginFieldData.password}
                                isPassword="true"
                                className="password-field"
                                onChange={(e) => {
                                    setLoginFieldData({
                                        ...loginFieldData,
                                        password: e.target.value,
                                    });
                                }}
                                onClick={ShowPassword}
                                ChangeClass={Password ? "show-hide active" : "show-hide"}
                                labelText="Password"
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
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Login"
                                    onClick={LoginSubmit}
                                />
                            </div>
                        </form>
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
