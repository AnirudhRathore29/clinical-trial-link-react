import { Link } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import Patient from "../../Components/SignupForm/Patient";
import TrialClinic from "../../Components/SignupForm/TrialClinic";
import Physician from "../../Components/SignupForm/Physician";
import PharmaCompanies from "../../Components/SignupForm/PharmaCompanies";
import "../Login/Login.css";

const SignUp = () => {
    
    return (
        <>
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Register</h1>
                        <p>A few clicks away from Creating your account</p>
                    </div>
                    <div className="authentication-bx sign-up-authentication">
                        <form autoComplete="off">
                            <Tabs defaultActiveKey="Patient" id="uncontrolled-tab-example" className="selectUserType">
                                <Tab eventKey="Patient"
                                    title={
                                        <>
                                            <img src="/images/patient.svg" alt="Patient" />
                                            <h2>Patient</h2>
                                            <i></i>
                                        </>
                                    }
                                >
                                    <Patient/>
                                </Tab>

                                <Tab eventKey="Trial_Clinic"
                                    title={
                                        <>
                                            <img src="/images/trial-clinic.svg" alt="Patient" />
                                            <h2>Trial Clinic</h2>
                                            <i></i>
                                        </>
                                    }
                                >
                                    <TrialClinic />
                                </Tab>
                                <Tab eventKey="Physician"
                                    title={
                                        <>
                                            <img src="/images/physician.svg" alt="Patient" />
                                            <h2>Physician</h2>
                                            <i></i>
                                        </>
                                    }
                                >
                                    <Physician />
                                </Tab>
                                <Tab eventKey="Pharmaceutical_Companies"
                                    title={
                                        <>
                                            <img src="/images/pharma-companies.svg" alt="Patient" />
                                            <h2>Clinical Trial Sponsor</h2>
                                            <i></i>
                                        </>
                                    }
                                >
                                    <PharmaCompanies />
                                </Tab>
                            </Tabs>
                            <p className="create-account">
                                Already have any account? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
