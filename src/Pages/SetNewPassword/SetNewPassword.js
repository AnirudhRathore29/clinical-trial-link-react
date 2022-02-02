import { useState } from 'react';
import CommonButton from "../../Components/Common/Buttons/Buttons";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import '../Login/Login.css';

const SetNewPassword = () => {
    const [formData, SetFormData] = useState({
        password: "",
        confirm_password: ""
    });

    /* Password show hide */
    const [Password, SetPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);

    const ShowPassword = () => {
        SetPassword(!Password);
    };
    const ShowConfirmPassword = () => {
        SetConfirmPassword(!confirmPassword);
    };
    /* Password show hide */
    return (
        <>
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Create New Password</h1>
                        <p>Your new password must be different from <br /> pervious used passwords.</p>
                    </div>
                    <div className="authentication-bx">
                        <form>
                            <InputText
                                type={Password ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                isPassword="true"
                                required="required"
                                onChange={(e) => {
                                    SetFormData({
                                        ...formData,
                                        password: e.target.value,
                                    });
                                }}
                                onClick={ShowPassword}
                                ChangeClass={Password ? "show-hide active" : "show-hide"}
                                labelText="Password"
                            />
                            <InputText
                                type={confirmPassword ? "text" : "password"}
                                name="confirm_password"
                                value={formData.confirm_password}
                                placeholder="Confirm Password"
                                required="required"
                                labelText="Confirm Password"
                                onChange={(e) => {
                                    SetFormData({
                                        ...formData,
                                        confirm_password: e.target.value,
                                    });
                                }}
                                isPassword="true"
                                onClick={ShowConfirmPassword}
                                ChangeClass={
                                    confirmPassword ? "show-hide active" : "show-hide"
                                }
                            />
                            <div className="form-group text-center mb-0">
                                <CommonButton isButton="true" BtnType="submit" BtnColor="green w-100" BtnText="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SetNewPassword;