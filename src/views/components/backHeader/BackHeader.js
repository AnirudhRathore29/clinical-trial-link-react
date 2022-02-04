import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { InputText } from "../Common/Inputs/Inputs";
import { toast } from "react-toastify";
import { Dropdown } from 'react-bootstrap';
import "./BackHeader.css";

const Header = ({ colorHeader }) => {
    const [scroll, setScroll] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);
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

    const ToggleSidemenu = () =>{
        setSideMenu(!sideMenu);
    }

    return (
        <>
            <header className={scroll ? "dashboard-header sticky" : `dashboard-header ${colorHeader}`}>
                <div className="hamburger" onClick={ToggleSidemenu}><img src={ sideMenu ? "/images/close.svg" : "/images/hamburger.svg"} alt="icon" /></div>
                <div className="dashboard-logo">
                    <Link to="/" className="d-block">
                        <img src="/images/logo.svg" alt="Logo" />
                    </Link>
                </div>
                <nav className="dashboard-rightNav">
                    <ul>
                        <li>
                            <div className="search-bx">
                                <InputText type="search" placeholder="Search for Trial" />
                                <img src="/images/search.svg" alt="search trial" />
                            </div>
                        </li>
                        <li className="notification-li">
                            <Dropdown>
                                <Dropdown.Toggle className="notification-dropdown"  variant="" id="notification-dropdown">
                                    <img src="/images/notification.svg" alt="notification" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link to="/" className="dropdown-item">
                                        <span><img src="/images/notification-icon2.svg" alt="icon" /></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        <span><img src="/images/notification-icon2.svg" alt="icon" /></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        <span><img src="/images/notification-icon2.svg" alt="icon" /></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        <span><img src="/images/notification-icon2.svg" alt="icon" /></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle className="user-info" variant="" id="user-dropdown">
                                    <div className="user-image"><img src="/images/avatar2.svg" alt="avatar" /></div>
                                    <div className="user-id-info">
                                        <h2>Hi, <span><img src="/images/hand-up.svg" alt="hand-icon" /></span> Amanda</h2>
                                        <p>Amanda@gmail.com</p>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link to="/" className="dropdown-item">Edit Profile</Link>
                                    <Link to="/" className="dropdown-item">My Chats</Link>
                                    <Link to="/" className="dropdown-item">Payment History</Link>
                                    <Link to="/" className="dropdown-item">Logout</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className={sideMenu ? "side-menu active" : "side-menu"}>
                <ul>
                    <li><Link to="" className="active">Dashboard</Link></li>
                    <li><Link to="">Appointments</Link></li>
                    <li><Link to="">Bank Details</Link></li>
                    <li><Link to="">Payment History</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;
