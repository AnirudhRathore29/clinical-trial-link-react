import { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import CommonButton from "../Common/Buttons/Buttons";
import { toast } from "react-toastify";
import "./Header.css";

const Header = ({colorHeader}) => {
    const [scroll, setScroll] = useState(false);
    const history = useHistory();
    const UserToken = localStorage.getItem("user-token");

    toast.configure();

    const logout = () => {
        history.push("/login")
    };

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
            {/* <div className="header-placeholder" style={{ height: height }}></div> */}
            <header className={scroll ? "site-header sticky" : `site-header ${colorHeader}`}>
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
