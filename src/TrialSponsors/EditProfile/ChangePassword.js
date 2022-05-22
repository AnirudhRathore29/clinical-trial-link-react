import { useState } from "react";
import { InputText, SelectBox, TextArea } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"

const ChangePassword = () => {
    const [Formdata, setFormdata] = useState({
        password: "",
        confirm_password: "",
    });

    /* Password show hide */
    const [Password, SetPassword] = useState(false);
    const [oldPassword, SetOldPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);

    const ShowPassword = () => {
        SetPassword(!Password);
    };
    const ShowOldPassword = () => {
        SetOldPassword(!oldPassword);
    };
    const ShowConfirmPassword = () => {
        SetConfirmPassword(!confirmPassword);
    };
    /* Password show hide */

    return (
        <div className="col-lg-4">
            <div className="repeat-white-bx">
                <h2 className="section-title">Change Password</h2>
                <InputText
                    type={oldPassword ? "text" : "password"}
                    name="password"
                    value={Formdata.oldPassword}
                    placeholder="Enter old password"
                    labelText="Old Password"
                    className="password-field"
                    onChange={(e) => {
                        setFormdata({ ...Formdata, oldPassword: e.target.value });
                    }}
                    isPassword="true"
                    onClick={ShowOldPassword}
                    ChangeClass={oldPassword ? "show-hide active" : "show-hide"}
                />
                <InputText
                    type={Password ? "text" : "password"}
                    name="password"
                    value={Formdata.password}
                    placeholder="Enter New Password"
                    labelText="New Password"
                    className="password-field"
                    onChange={(e) => {
                        setFormdata({ ...Formdata, password: e.target.value });
                    }}
                    isPassword="true"
                    onClick={ShowPassword}
                    ChangeClass={Password ? "show-hide active" : "show-hide"}
                />
                <InputText
                    type={confirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={Formdata.confirm_password}
                    placeholder="Confirm Password"
                    labelText="Confirm Password"
                    className="password-field"
                    onChange={(e) => {
                        setFormdata({
                            ...Formdata,
                            confirm_password: e.target.value,
                        });
                    }}
                    isPassword="true"
                    onClick={ShowConfirmPassword}
                    ChangeClass={
                        confirmPassword ? "show-hide active" : "show-hide"
                    }
                />
                <Button
                    isButton="true"
                    BtnType="submit"
                    BtnColor="primary w-100"
                    BtnText="Save"
                />
            </div>
        </div>
    )
}

export default ChangePassword;