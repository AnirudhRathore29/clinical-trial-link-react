import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import CommonButton from "../Common/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { LogoutApiData } from "../../Redux/Action/AuthAction";
import "./Header.css";
import { toast } from "react-toastify";

const Header = () => {
    const [scroll, setScroll] = useState(false);
    const [height, setHeight] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const header = useRef(null);
    const UserToken = localStorage.getItem("user-token");

    toast.configure();

    const logout = () => {
        dispatch(LogoutApiData());
        localStorage.removeItem("user-token");
        toast.success("Logout Successfully");
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
            {
                location.pathname === "/my-subscription" || location.pathname === "/my-profile"
                    ? null
                    : (
                        <>
                            <div className="header-placeholder" style={{ height: height }}></div>
                            <header
                                className={scroll ? "site-header sticky" : "site-header"}
                                ref={header}
                            >
                                <nav className="navbar msingipack-default-navbar container-fluid">
                                    <div className="msingipack-navLogo-side">
                                        <NavLink to="/" className="navbar-brand">
                                            <img src="/images/logo.svg" alt="Logo" />
                                        </NavLink>
                                    </div>
                                    <div className="navbar-collapse msingipack-rightNav-side">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <Link to="content-plans" offset={-180} smooth={true}>
                                                    {" "}
                                                    Content Plans{" "}
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/about"> About </NavLink>
                                            </li>
                                            <li className="nav-item hasDropDown">
                                                <NavLink to="/pricing"> Pricing</NavLink>{" "}
                                            </li>
                                            <li className="nav-item hasDropDown">
                                                <NavLink to="">Resources</NavLink>
                                                <div className="dropdown-custom">
                                                    <NavLink to="/getting-started">Getting started</NavLink>
                                                    <NavLink to="/api-documentation">API Documentation</NavLink>
                                                    <NavLink to="/integrations">Integrations</NavLink>
                                                    <NavLink to="/#">Free Test Account</NavLink>
                                                    <NavLink to="/faqs">FAQs</NavLink>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/contact-us"> Contact </NavLink>
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
                                                            BtnColor="red"
                                                            BtnText="Login"
                                                        />
                                                    </li>
                                                    <li className="nav-item btn-item">
                                                        <CommonButton
                                                            isLink="true"
                                                            URL="/sign-up"
                                                            BtnColor="green"
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
                    )
            }
        </>
    );
};

export default Header;
