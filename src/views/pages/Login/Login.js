import { useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "../../components/Common/Inputs/Inputs";
import RadioBtn from "../../components/Common/RadioBtn/RadioBtn"
import Button from "../../components/Common/Buttons/Buttons";
import Header from "../../components/Header/Header";
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
            <Header colorHeader="colorHeader" />
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
                                <RadioBtn
                                    className="checkbox-btn"
                                    type="checkbox"
                                    name="t_c"
                                    onChange={(e) => {
                                        setLoginFieldData({
                                            ...loginFieldData,
                                            t_c: e.target.value,
                                        });
                                    }}
                                    labelText="Remember me"
                                />
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
