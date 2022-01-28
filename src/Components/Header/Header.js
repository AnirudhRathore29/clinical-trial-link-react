import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import CommonButton from "../Common/Buttons/Buttons";
import { toast } from "react-toastify";
import "./Header.css";

const Header = () => {
    const [scroll, setScroll] = useState(false);
    const [height, setHeight] = useState(0);
    const navigate = useNavigate();
    const header = useRef(null);
    const UserToken = localStorage.getItem("user-token");

    toast.configure();

    const logout = () => {
        navigate("/login");
    };

    useEffect(() => {
        window.addEventListener(
            "scroll",
            () => {
                if (window.scrollY > 5) {
                    setScroll(true);
                    setHeight(header.current.clientHeight);
                } else {
                    setScroll(false);
                    setHeight(0);
                }
            },
            []
        );
    });

    return (
        <>
            <div className="header-placeholder" style={{ height: height }}></div>
            <header
                className={scroll ? "site-header sticky" : "site-header"}
                ref={header}
            >
                <nav className="navbar msingipack-default-navbar container-fluid">
                    <div className="msingipack-navLogo-side">
                        <Link to="/" className="d-block">
                            <img src="/images/logo.svg" alt="Logo" />
                        </Link>
                    </div>
                    <div className="navbar-collapse msingipack-rightNav-side">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/"> Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/ask">Ask the Expert</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact">Contact Us</NavLink>
                            </li>
                            {UserToken ? (
                                <>
                                    <li className="nav-item btn-item">
                                        <CommonButton
                                            isLink="true"
                                            URL="/my-subscription"
                                            BtnColor="green"
                                            BtnText="Dashboard"
                                        />
                                    </li>
                                    <li className="nav-item btn-item">
                                        <CommonButton
                                            isButton="true"
                                            URL="/"
                                            BtnColor="red"
                                            BtnText="Logout"
                                            onClick={logout}
                                        />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item btn-item">
                                        <CommonButton
                                            isLink="true"
                                            URL="/login"
                                            BtnColor="green"
                                            BtnText="Login"
                                        />
                                    </li>
                                    <li className="nav-item btn-item">
                                        <CommonButton
                                            isLink="true"
                                            URL="/sign-up"
                                            BtnColor="primary"
                                            BtnText="Sign up"
                                        />
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
