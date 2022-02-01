import { useEffect } from 'react';
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import { Link } from 'react-router-dom';
import CommonButton from "../../Components/Common/Buttons/Buttons";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user-token")) {
            navigate("/");
        }
    }, []);
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
                    <SectionTitle CustomClass="text-center pad-b-30" title="Forgot Password" ShapeImage="heading-clip-1.svg" SubHeading={<p className="what-sec-text">Enter your email address</p>} />
                    <div className="authentication-bx">
                        <form>
                            <InputText
                                type="email"
                                placeholder="Email"
                            />
                            <div className="form-group text-center">
                                <CommonButton isButton="true" BtnType="submit" BtnColor="green w-100" BtnText="Send reset password link" />
                            </div>
                            <p className="create-account">back to <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgotPassword;