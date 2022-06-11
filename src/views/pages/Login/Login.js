import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { InputText } from "../../Components/Common/Inputs/Inputs";
import RadioBtn from "../../Components/Common/RadioBtn/RadioBtn"
import Button from "../../Components/Common/Buttons/Buttons";
import Header from "../../Components/FrontHeader/FrontHeader";
import "./Login.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { LoginAction, ResendEmailAction } from "./../../../redux/actions/authAction"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonModal from './../../Components/Common/Modal/Modal';
import { isValidEmailAddress, isValidPassword } from "./../../Components/Validation/Validation"

toast.configure();
const Login = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()
    const loginSelector = useSelector(state => state)
    const [isChecked, setisChecked] = useState(false)
    const [submitClick, setSubmitClick] = useState()
    const [loginFieldData, setLoginFieldData] = useState({
        email: "",
        password: "",
    });
    const [emailNotVerified, setEmailNotVerified] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState();
    const [clickVerifyEmail, setClickVerifyEmail] = useState(false);

    /* password show hide */
    const [Password, SetPassword] = useState(false);
    const ShowPassword = () => {
        SetPassword(!Password);
    };
    /* password show hide */

    //Check user is logged in or not
    useEffect(() => {
        if (props.auth.isAuthenticated) {
            history.push('/');
        }
    }, [props, history]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginFieldData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    useEffect(() => {
        if (submitClick === true) {
            if (Object.keys(loginSelector.auth.user).length !== 0 && loginSelector.auth.loading === false) {
                if (loginSelector.auth.user.data) {
                    toast.success(loginSelector.auth.user.data.message, { theme: "colored" })
                    if (loginSelector.auth.user.data?.data?.role === 2) {
                        if (loginSelector.auth.user.data.data.isProfileCompleted) {
                            history.push('/patient/dashboard');
                        } else {
                            history.push('/patient/complete-profile');
                        }
                    } else if (loginSelector.auth.user.data?.data?.role === 3) {
                        if (loginSelector.auth.user.data.data.isProfileCompleted) {
                            history.push('/trial-clinic/dashboard');
                        } else {
                            history.push('/trial-clinic/complete-profile');
                        }
                    } else if (loginSelector.auth.user.data?.data?.role === 4) {
                        if (loginSelector.auth.user.data.data.isProfileCompleted) {
                            history.push('/physician/dashboard');
                        } else {
                            history.push('/physician/complete-profile');
                        }
                    } else if (loginSelector.auth.user.data?.data?.role === 5) {
                        if (loginSelector.auth.user.data.data.isProfileCompleted) {
                            history.push('/trial-sponsors/dashboard');
                        } else {
                            history.push('/trial-sponsors/complete-profile');
                        }
                    }
                }
            } else if (Object.keys(loginSelector.auth.error).length !== 0 && loginSelector.auth.loading === false) {
                let err = loginSelector.auth.error.message;
                toast.error(err, { theme: "colored" });
                if (loginSelector.auth.error.isEmailNotVerifiedError === 1) {
                    setEmailNotVerified(true)
                }
                setSubmitClick(false)
            }
        }

        if (clickVerifyEmail === true) {
            if (Object.keys(loginSelector.auth.user).length !== 0 && loginSelector.auth.loading === false) {
                toast.success(loginSelector.auth.user.data.message, { theme: "colored" })
                history.push({
                    pathname: '/verify-email',
                    state: {
                        email: verifyEmail
                    }
                });
            } else if (Object.keys(loginSelector.auth.error).length !== 0 && loginSelector.auth.loading === false) {
                let err = loginSelector.auth.error.message;
                toast.error(err, { theme: "colored" });
                setClickVerifyEmail(false)
            }
        }
    }, [loginSelector, history, clickVerifyEmail, submitClick, verifyEmail]);


    const Vaildation = (value) => {
        const isEmailVaild = isValidEmailAddress(value.email);
        const isPasswordVaild = isValidPassword(value.password);
        if (!isEmailVaild.status) {
            toast.error(isEmailVaild.message, { theme: "colored" })
            return false
        } else if (!isPasswordVaild.status) {
            toast.error(isPasswordVaild.message, { theme: "colored" })
            return false
        }
        return true
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const logValue = {
            email: loginFieldData.email,
            password: loginFieldData.password,
        }
        const isVaild = Vaildation(logValue)
        if (isVaild) {
            setSubmitClick(true)
            dispatch(LoginAction(logValue))
        }
    }

    const handleModalClose = () => setEmailNotVerified(false);

    const handleEmailVerify = (e) => {
        e.preventDefault();
        dispatch(ResendEmailAction({ email: verifyEmail }))
        setClickVerifyEmail(true)
    }

    return (
        <>
            <Header className="innerPageHeader" />

            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Login</h1>
                        <p>Welcome back, please login to your account</p>
                    </div>
                    <div className="authentication-bx">
                        <Form onSubmit={handleLoginSubmit} autoComplete="off">
                            <InputText
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={onChange}
                                labelText="Email"
                                required="required"
                            />
                            <InputText
                                type={Password ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                isPassword="true"
                                className="password-field"
                                onChange={onChange}
                                onClick={ShowPassword}
                                ChangeClass={Password ? "show-hide active" : "show-hide"}
                                labelText="Password"
                                required="required"
                            />

                            <div className="forgot-link">
                                <RadioBtn
                                    className="checkbox-btn"
                                    type="checkbox"
                                    name="lsRememberMe"
                                    onChange={(e) => setisChecked(e.target.checked)}
                                    checked={isChecked}
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
                                    hasSpinner={submitClick === true && loginSelector.auth.loading}
                                    disabled={submitClick === true && loginSelector.auth.loading}
                                />
                            </div>
                        </Form>
                        <p className="create-account">
                            Don't have any account? <Link to="/sign-up">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </section>

            <CommonModal show={emailNotVerified} onHide={handleModalClose} keyboard={false}
                // ModalTitle="Verify Your Email"
                // onClick={handleClose}
                ModalData={
                    <>
                        <div className='congrats-bx pb-5'>
                            <h2 className='pb-2'> Verify your email </h2>
                            <p> Enter your registered email address for the verification proccess, We'll send you a link to get back into your account. </p>
                        </div>
                        <Form onSubmit={handleEmailVerify} autoComplete="off">
                            <InputText
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={(e) => setVerifyEmail(e.target.value)}
                                labelText="Email"
                                required="required"
                            />
                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary w-100"
                                    BtnText="Submit"
                                    hasSpinner={loginSelector.auth.loading}
                                    disabled={loginSelector.auth.loading}
                                />
                            </div>
                        </Form>
                    </>
                }
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Login);