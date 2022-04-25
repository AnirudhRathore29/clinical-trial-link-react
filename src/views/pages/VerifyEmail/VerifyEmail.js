import { useState, useEffect } from "react"
import Button from "../../Components/Common/Buttons/Buttons";
import { useHistory } from 'react-router-dom';
import Header from "../../Components/FrontHeader/FrontHeader";
import '../Login/Login.css';
import { ResendEmailAction } from "./../../../redux/actions/authAction"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const VerifyEmail = (props) => {
    const dispatch = useDispatch()
    const verifyEmailSelector = useSelector(state => state)
    const history = useHistory();
    const [submitClick, setSubmitClick] = useState(false);

    if (props.location.state === undefined || props.location.state === null) {
        history.push("/sign-up")
    }

    useEffect(() => {
        if (submitClick === true) {
            if (Object.keys(verifyEmailSelector.auth.user).length !== 0 && verifyEmailSelector.auth.loading === false) {
                toast.success(verifyEmailSelector.auth.user.data.message, { theme: "colored" })
            } else if (Object.keys(verifyEmailSelector.auth.error).length !== 0 && verifyEmailSelector.auth.loading === false) {
                let err = verifyEmailSelector.auth?.error?.message;
                toast.error(err, { theme: "colored" });
            }
        }
    }, [verifyEmailSelector]);

    const HandleResendEmail = () => {
        dispatch(ResendEmailAction({ email: props.location.state.email }))
        setSubmitClick(true)
    }
    return (
        <>
            <Header className="innerPageHeader" />
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Verify Your Email</h1>
                        <p>Check your email & click the link to <br /> Verify your account</p>
                    </div>
                    <div className="authentication-bx">
                        <form>
                            <div className="airplane-bx">
                                <img src="/images/email-verification.svg" height="300" alt="Verify Your Email" />
                            </div>
                            <div className="form-group text-center">
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Continue"
                                    onClick={() => history.push("/login")}
                                />
                            </div>
                            <p className="create-account d-flex align-items-center justify-content-center">
                                Not received Email?
                                <Button
                                    isButton="true"
                                    BtnType="button"
                                    BtnColor="sm btn-text p-0 ms-1"
                                    BtnText="Resend Email"
                                    onClick={HandleResendEmail}
                                    hasSpinner={verifyEmailSelector.auth.loading}
                                    disabled={verifyEmailSelector.auth.loading}
                                />
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VerifyEmail;