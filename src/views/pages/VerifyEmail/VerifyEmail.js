import Button from "../../Components/Common/Buttons/Buttons";
import {Link, useHistory} from 'react-router-dom';
import Header from "../../Components/FrontHeader/FrontHeader";
import '../Login/Login.css';

const VerifyEmail = () => {
    const history = useHistory();
    const validateUser = localStorage.getItem("userType")

    const VerifyEmailSubmit = () => {
        history.push(`${validateUser === "Patient" ? "/patient" : validateUser === "Trial_Clinic" ? "/trial-clinic" : validateUser === "Physician" ? "/physician" : validateUser === "Pharmaceutical_Companies" ? "/trial-sponsors" : null}/complete-profile`)
    }

    return (
        <>
            <Header colorHeader="colorHeader" />
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
                                <Button isButton="true" BtnType="submit" BtnColor="green w-100" BtnText="Continue" onClick={VerifyEmailSubmit} />
                            </div>
                            <p className="create-account">Not received Email? <Link to="/">Resend Email</Link></p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VerifyEmail;