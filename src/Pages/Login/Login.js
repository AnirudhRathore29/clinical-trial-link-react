import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import CommonButton from "../../Components/Common/Buttons/Buttons";
import { loginApiData } from "../../Redux/Action/AuthAction";


import "./Login.css";

const Login = () => {
    const myState1 = useSelector((state) => state.signupApiData);
    console.log("myState1", myState1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginFieldData, setLoginFieldData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem("user-token")) {
            navigate("/");
        }
    }, []);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginApiData({ loginFieldData }));
    };

    /* password show hide */
    const [Password, SetPassword] = useState(false);
    const ShowPassword = () => {
        SetPassword(!Password);
    };
    /* password show hide */

    return (
        <>
            <section className="hero-section authentication-banner">
                <div className="banner-bg">
                    <img src="/images/banner-top-vector.svg" alt="banner-vectors" />
                </div>
                <div className="banner-btm-bg">
                    <img src="/images/banner-btm-vector.svg" alt="banner-vectors" />
                </div>
                <div className="container-fluid">
                    <SectionTitle
                        CustomClass="text-center pad-b-30"
                        title="Login"
                        ShapeImage="heading-clip-1.svg"
                        SubHeading={<p className="what-sec-text">Sign Into Your Account</p>}
                    />
                    <div className="authentication-bx">
                        <form onSubmit={loginSubmit}>
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
                                />
                            </div>
                            <p className="create-account">
                                Don't have any account? <Link to="/sign-up">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};


export default Login;
