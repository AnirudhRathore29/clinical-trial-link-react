import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from "../../Components/Common/Buttons/Buttons";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import Header from "../../Components/FrontHeader/FrontHeader";
import '../Login/Login.css';
import { connect, useDispatch, useSelector } from "react-redux";
import { ForgotPasswordAction } from "./../../../redux/actions/authAction"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ForgotPassword = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const ForgotSelector = useSelector(state => state)
    const [email, setEmail] = useState();
    const [clickable, setClickable] = useState(false)

    //Check user is logged in or not
    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push('/');
        }
    }, [props]);

    //Check user is logged in or not
    useEffect(() => {
        if (clickable === true) {
            if (Object.keys(ForgotSelector.auth.user).length !== 0 && ForgotSelector.auth.loading === false) {
                toast.success(ForgotSelector.auth.user.data.message, { theme: "colored" })
                history.push("/login");
            } else if (Object.keys(ForgotSelector.auth.error).length !== 0 && ForgotSelector.auth.loading === false) {
                let err = ForgotSelector.auth.error.message;
                toast.error(err, { theme: "colored" });
                setClickable(false)
            }
        }
    }, [ForgotSelector, clickable, history]);

    const handleForgotPassSubmit = (e) => {
        e.preventDefault();
        dispatch(ForgotPasswordAction({ email }))
        setClickable(true)
    }

    return (
        <>
            <Header className="innerPageHeader" />

            <section className="authentication-section">
                <div className="container-fluid">
                    <div className="auth-heading">
                        <h1>Forgot Password</h1>
                        <p>Please enter your email below to <br /> receive reset password link</p>
                    </div>
                    <Form onSubmit={handleForgotPassSubmit} className="authentication-bx" autoComplete="off">
                        <InputText
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            labelText="Email"
                            required="required"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="form-group text-center">
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="green w-100"
                                hasSpinner={clickable === true && ForgotSelector.auth.loading}
                                disabled={clickable === true && ForgotSelector.auth.loading}
                                BtnText="Send reset password link"
                            />
                        </div>
                        <p className="create-account">Back to <Link to="/login">Login</Link></p>
                    </Form>
                </div>
            </section>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ForgotPassword);