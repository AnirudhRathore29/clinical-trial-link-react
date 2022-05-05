import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "../Common/Buttons/Buttons";
import { toast } from "react-toastify";
import "./FrontHeader.css";

const Header = (props) => {
    const [scroll, setScroll] = useState(false);
    const UserToken = localStorage.getItem("jwtToken");
    const validateUser = localStorage.getItem("userType")

    toast.configure();

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
                            <li className="nav-item">
                                <NavLink to="/ask">Ask the Expert</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact-us">Contact Us</NavLink>
                            </li>
                            {UserToken
                                ?
                                <>
                                    <li className="nav-item btn-item">
                                        <Button
                                            isLink="true"
                                            URL={`${validateUser === "Patient" ? "/patient" : validateUser === "Trial_Clinic" ? "/trial-clinic" : validateUser === "Physician" ? "/physician" : validateUser === "Pharmaceutical_Companies" ? "/trial-sponsors" : null}/dashboard`}
                                            BtnColor="green"
                                            BtnText="Dashboard"
                                        />
                                    </li>
                                    <li className="nav-item btn-item">
                                        <Button
                                            isLink="true"
                                            URL="/logout"
                                            BtnColor="primary"
                                            BtnText="Logout"
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

export default Header;
