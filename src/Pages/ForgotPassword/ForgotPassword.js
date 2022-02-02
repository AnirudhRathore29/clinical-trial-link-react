import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import CommonButton from "../../Components/Common/Buttons/Buttons";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import '../Login/Login.css';

const ForgotPassword = () => {
    const history = useHistory();
    const ForgotPasswordSubmit = () => {
        history.push("/new-password");
    }
    return (
        <>
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Forgot Password</h1>
                        <p>Please enter your email below to <br /> receive reset password link</p>
                    </div>
                    <div className="authentication-bx">
                        <form>
                            <InputText
                                type="email"
                                placeholder="Enter Email"
                                labelText="Email"
                            />
                            <div className="form-group text-center">
                                <CommonButton isButton="true" BtnType="submit" BtnColor="green w-100" BtnText="Send reset password link" onClick={ForgotPasswordSubmit} />
                            </div>
                            <p className="create-account">Back to <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgotPassword;