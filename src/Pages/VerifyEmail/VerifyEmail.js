import Button from "../../Components/Common/Buttons/Buttons";
import {Link, useHistory} from 'react-router-dom';
import '../Login/Login.css';

const VerifyEmail = () => {
    const history = useHistory();

    const VerifyEmailSubmit = () => {
        history.push("/patient/complete-profile")
    }

    return (
        <>
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