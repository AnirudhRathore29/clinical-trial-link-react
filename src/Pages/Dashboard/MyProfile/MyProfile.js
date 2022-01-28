import { useState } from 'react';
import DashboardNavbar from '../../../Components/DashboardNavbar/DashboardNavbar';
import DashboardHeader from '../../../Components/DashboardHeader/DashboardHeader';
import CommonButton from '../../../Components/Common/Buttons/Buttons';
import { InputText } from '../../../Components/Common/Inputs/Inputs';
import '../../../Components/Common/ContactForm/ContactForm.css';
import '../Dashboard.css';
import './MyProfile.css';

const Dashboard = () => {
    const [Password, SetPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);
    const [CurrentPassword, SetShowCurrentPassword] = useState(false);

    const ShowPassword = () => {
        SetPassword(!Password);
    }
    const ShowConfirmPassword = () => {
        SetConfirmPassword(!confirmPassword);
    }
    const ShowCurrentPassword = () => {
        SetShowCurrentPassword(!CurrentPassword);
    }
    return (
        <>
            <DashboardHeader />

            <div className="mpc-dashboard">
                <DashboardNavbar />
                <div className="dashboard-right-content">
                    <h1 className="main-page-heading with-filter"> My Profile</h1>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="repeat-white-bx shadow-none">
                                <form>
                                    <InputText
                                        type="text"
                                        className="form-control"
                                        defaultValue="Mike Hoover"
                                        placeholder="Full Name"
                                    />
                                    <InputText
                                        type="email"
                                        className="form-control"
                                        defaultValue="Mike@gmail.com"
                                        placeholder="Email Address"
                                    />
                                    <InputText
                                        type="text"
                                        className="form-control"
                                        defaultValue="9783035649"
                                        placeholder="Phone Number"
                                    />
                                    <InputText
                                        type="url"
                                        className="form-control"
                                        defaultValue="https://www.msingipack.com"
                                        placeholder="Website"
                                    />
                                    <div className="form-group text-center mb-0">
                                        <CommonButton isButton="true" BtnType="submit" BtnColor="green w-50" BtnText="Update Profile" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="repeat-white-bx shadow-none">
                                <form>
                                    <InputText
                                        type={CurrentPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Current Password"
                                        required="required"
                                        FormGroupClass="hasicon"
                                        isPassword="true"
                                        onClick={ShowCurrentPassword}
                                        ChangeClass={CurrentPassword ? "show-hide active" : "show-hide"}
                                    />
                                    <InputText
                                        type={Password ? "text" : "password"}
                                        name="new_password"
                                        placeholder="New Password"
                                        required="required"
                                        FormGroupClass="hasicon"
                                        isPassword="true"
                                        onClick={ShowPassword}
                                        ChangeClass={Password ? "show-hide active" : "show-hide"}
                                    />
                                    <InputText
                                        type={confirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        placeholder="Confirm Password"
                                        required="required"
                                        FormGroupClass="hasicon"
                                        isPassword="true"
                                        onClick={ShowConfirmPassword}
                                        ChangeClass={confirmPassword ? "show-hide active" : "show-hide"}
                                    />
                                    <div className="form-group text-center mb-0">
                                        <CommonButton isButton="true" BtnType="submit" BtnColor="green w-50" BtnText="Update Password" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;