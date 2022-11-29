import { useState } from "react";
import { InputText } from "../../views/Components/Common/Inputs/Inputs";
import Button from "../../views/Components/Common/Buttons/Buttons"
import { authHeader } from "../../redux/actions/authHeader";
import getCurrentHost from "../../redux/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidPassword } from "../../views/Components/Validation/Validation";

toast.configure();
const ChangePassword = () => {
    const [Password, SetPassword] = useState(false);
    const [oldPassword, SetOldPassword] = useState(false);
    const [confirmPassword, SetConfirmPassword] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Formdata, setFormdata] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    console.log("Formdata", Formdata);
    console.log("Formdata", JSON.stringify(Formdata));

    /* Password show hide */
    const ShowPassword = () => SetPassword(!Password);
    const ShowOldPassword = () => SetOldPassword(!oldPassword);
    const ShowConfirmPassword = () => SetConfirmPassword(!confirmPassword);
    /* Password show hide */

    const validation = () => {
        const isPasswordVaild = isValidPassword(Formdata.new_password)

        if ((Formdata.new_password !== Formdata.confirm_password) && (Formdata.new_password !== "" && Formdata.confirm_password !== "")) {
            toast.error("Confirm password is not matched! ", { theme: "colored" })
            return false
        } else if (!isPasswordVaild.status) {
            toast.error(isPasswordVaild.message, { theme: "colored" })
            return false
        }
        return true
    }

    const changePassword = (e) => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            setLoading(true)
            const configure = {
                method: "POST",
                headers: authHeader(),
                body: JSON.stringify(Formdata)
            }
            fetch(getCurrentHost() + "/change-password", configure)
                .then((response) => response.json())
                .then((response) => {
                    if (response.status_code === 200) {
                        toast.success(response.message, { theme: "colored" })
                        setFormdata({
                            old_password: "",
                            new_password: "",
                            confirm_password: "",
                        })
                        setLoading(false)
                    } else {
                        toast.error(response.message, { theme: "colored" })
                        setLoading(false)
                    }
                    console.log("response", response);
                })
                .catch((error) => {
                    console.log("error", error);
                })
        }
    }

    return (
        <div className="col-lg-4">
            <div className="repeat-white-bx">
                <h2 className="section-title">Change Password</h2>
                <form onSubmit={changePassword}>
                    <InputText
                        type={oldPassword ? "text" : "password"}
                        name="old_password"
                        value={Formdata.old_password}
                        placeholder="Enter old password"
                        labelText="Old Password"
                        className="password-field"
                        required={true}
                        onChange={(e) => {
                            setFormdata({ ...Formdata, old_password: e.target.value });
                        }}
                        isPassword="true"
                        onClick={ShowOldPassword}
                        ChangeClass={oldPassword ? "show-hide active" : "show-hide"}
                    />
                    <InputText
                        type={Password ? "text" : "password"}
                        name="new_password"
                        value={Formdata.new_password}
                        required={true}
                        placeholder="Enter New Password"
                        labelText="New Password"
                        className="password-field"
                        onChange={(e) => {
                            setFormdata({ ...Formdata, new_password: e.target.value });
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
                        required={true}
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
                        disabled={Loading}
                        hasSpinner={Loading}
                    />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;