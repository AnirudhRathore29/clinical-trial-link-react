import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "../Common/Buttons/Buttons";
import { toast } from "react-toastify";
import "./FrontHeader.css";
import { connect, useDispatch } from "react-redux";
import { LogoutAction } from "../../../redux/actions/authAction";

toast.configure();
var jwt = require('jsonwebtoken');
const Header = (props) => {
    const dispatch = useDispatch()
    const [scroll, setScroll] = useState(false);
    var profileDetails = localStorage.getItem("auth_security") && jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("profileDetails", profileDetails);

    useEffect(() => {
        window.addEventListener(
            "scroll",
            () => {
                if (window.scrollY > 2) {
                    setScroll(true);
                } else {
                    setScroll(false);
                }
            },
            []
        );
    });


    const handleLogout = () => {
        dispatch(LogoutAction())
    }
    return (
        <>
            <header className={scroll ? "site-header sticky" : `site-header ${props.className}`}>
                <nav className="navbar clinicaltrial-default-navbar container-fluid">
                    <div className="clinicaltrial-navLogo-side">
                        <Link to="/" className="d-block">
                            <img src="/images/logo.svg" alt="Logo" />
                        </Link>
                    </div>
                    <div className="navbar-collapse clinicaltrial-rightNav-side">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/"> Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about-us">About Us</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to="/ask">Ask the Expert</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink to="/contact-us">Contact Us</NavLink>
                            </li>
                            {props.auth.isAuthenticated
                                ?
                                <>
                                    <li className="nav-item btn-item">
                                        <Button
                                            isLink="true"
                                            URL={`${props.auth.user.role === 2 ? "/patient" : props.auth.user.role === 3 ? "/trial-clinic" : props.auth.user.role === 4 ? "/physician" : props.auth.user.role === 5 ? "/trial-sponsors" : null}/dashboard`}
                                            BtnColor={profileDetails.isProfileCompleted === true ? "green" : "green disabled"}
                                            BtnText="Dashboard"
                                        />
                                    </li>
                                    <li className="nav-item btn-item">
                                        <Button
                                            isButton="true"
                                            URL="/logout"
                                            BtnColor="primary"
                                            BtnText="Logout"
                                            onClick={handleLogout}
                                        />
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item btn-item">
                                        <Button
                                            isLink="true"
                                            URL="/login"
                                            BtnColor="green"
                                            BtnText="Login"
                                        />
                                    </li>
                                    <li className="nav-item btn-item">
                                        <Button
                                            isLink="true"
                                            URL="/sign-up"
                                            BtnColor="primary"
                                            BtnText="Sign up"
                                        />
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Header);
