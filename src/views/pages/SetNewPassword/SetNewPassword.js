import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation} from 'react-router-dom';
import Button from "../../Components/Common/Buttons/Buttons";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import Header from "../../Components/FrontHeader/FrontHeader";
import '../Login/Login.css';
import { Form } from 'react-bootstrap';
import { CreateNewPassAction } from "./../../../redux/actions/authAction"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();
const SetNewPassword = () => {
    const dispatch = useDispatch();
    const newPassSelector = useSelector(state => state.auth);
    const history = useHistory();
    const location = useLocation()
    const [clickSubmit, setClickSubmit] = useState(false);
    const [formData, SetFormData] = useState({
        password: "",
        confirm_password: ""
    });

    console.log("new URLSearchParams(location.search)", new URLSearchParams(location.search).get("token"));
    console.log("location", location);

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

    const onChange = (e) => {
        const { name, value } = e.target;
        SetFormData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    useEffect(() => {
        if (clickSubmit === true) {
            if (Object.keys(newPassSelector.user).length !== 0 && newPassSelector.loading === false) {
                toast.success(newPassSelector.user.data.message, { theme: "colored", autoClose: 5000})
                history.push("/login");
            } else if (Object.keys(newPassSelector.error).length !== 0 && newPassSelector.loading === false) {
                let err = newPassSelector.error.message;
                toast.error(err, { theme: "colored", autoClose: 5000});
                setClickSubmit(false)
            }
        }
    }, [newPassSelector, clickSubmit, history])

    const handleCreatePasswordSubmit = (e) => {
        e.preventDefault();
        let data = {
            token: new URLSearchParams(location.search).get("token") ? new URLSearchParams(location.search).get("token") : location?.state,
            password: formData.password,
            confirm_password: formData.confirm_password
        }
        dispatch(CreateNewPassAction(data))
        setClickSubmit(true)
    }
    return (
        <>
            <Header className="innerPageHeader" />
            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Create New Password</h1>
                        <p>Your new password must be different from <br /> pervious used passwords.</p>
                    </div>
                    <Form onSubmit={handleCreatePasswordSubmit} className="authentication-bx" autoComplete="off">
                        <InputText
                            type={Password ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            isPassword="true"
                            required="required"
                            onChange={onChange}
                            onClick={ShowPassword}
                            ChangeClass={Password ? "show-hide active" : "show-hide"}
                            labelText="Password"
                        />
                        <InputText
                            type={confirmPassword ? "text" : "password"}
                            name="confirm_password"
                            placeholder="Confirm Password"
                            required="required"
                            labelText="Confirm Password"
                            onChange={onChange}
                            isPassword="true"
                            onClick={ShowConfirmPassword}
                            ChangeClass={
                                confirmPassword ? "show-hide active" : "show-hide"
                            }
                        />
                        <div className="form-group text-center mb-0">
                            <Button isButton="true" BtnType="submit" BtnColor="green w-100" BtnText="Submit" />
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}

export default SetNewPassword;