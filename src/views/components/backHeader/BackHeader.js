import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { InputText } from "../Common/Inputs/Inputs";
import { toast } from "react-toastify";
import { Dropdown } from 'react-bootstrap';
import 'boxicons';
import "./BackHeader.css";

const Header = ({ colorHeader, headerColor }) => {
    //const [scroll, setScroll] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);
    const history = useHistory();

    toast.configure();

    const logout = () => {
        localStorage.removeItem("jwtToken")
        history.push("/login")
    };

    // useEffect(() => {
    //     window.addEventListener(
    //         "scroll",
    //         () => {
    //             if (window.scrollY > 2) {
    //                 setScroll(true);
    //             } else {
    //                 setScroll(false);
    //             }
    //         },
    //         []
    //     );
    // });

    const ToggleSidemenu = () => {
        setSideMenu(!sideMenu);
    }

    return (
        <>
            <header className={`dashboard-header ${colorHeader} ${headerColor}`}>
                <div className="hamburger" onClick={ToggleSidemenu}><img src={sideMenu ? "/images/close.svg" : "/images/hamburger.svg"} alt="icon" /></div>
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
                                <span className="search-icon"><box-icon name='search' color='#CDEB8B' ></box-icon></span>
                            </div>
                        </li>
                        <li className="notification-li">
                            <Dropdown>
                                <Dropdown.Toggle className="notification-dropdown" variant="" id="notification-dropdown">
                                    <img src="/images/notification.svg" alt="notification" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link to="/" className="dropdown-item">
                                        <span><box-icon name='bell' type='solid' color='#333333' ></box-icon></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        <span><box-icon name='bell' type='solid' color='#333333' ></box-icon></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        <span><box-icon name='bell' type='solid' color='#333333' ></box-icon></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        <span><box-icon name='bell' type='solid' color='#333333' ></box-icon></span>
                                        <div>
                                            <p>Dr. William Jones has reject your consultation.</p>
                                            <small>08/20/2020</small>
                                        </div>
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="user-info-li">
                            <Dropdown>
                                <Dropdown.Toggle className="user-info" variant="" id="user-dropdown">
                                    <div className="user-image"><img src="/images/avatar2.svg" alt="avatar" /></div>
                                    <div className="user-id-info">
                                        <h2>Hi, <span><img src="/images/hand-up.svg" alt="hand-icon" /></span> Amanda</h2>
                                        <p>Amanda@gmail.com</p>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link to="/patient/edit-profile" className="dropdown-item"><box-icon name='edit-alt'></box-icon> Edit Profile</Link>
                                    <Link to="/patient/my-chats" className="dropdown-item"><box-icon name='message-rounded-dots' ></box-icon> My Chats</Link>
                                    <Link to="/patient/my-favorites" className="dropdown-item"><box-icon name='happy-heart-eyes'></box-icon> My Favorites</Link>
                                    <Link to="/" className="dropdown-item" onClick={logout}><box-icon name='log-out-circle' ></box-icon> Logout</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className={sideMenu ? "side-menu active" : "side-menu"}>
                <ul>
                    <li><Link to="/patient/dashboard" className="active"><box-icon type='solid' name='dashboard' color='#ffffff'></box-icon> Dashboard</Link></li>
                    <li><Link to="/patient/my-appointments"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> Appointments</Link></li>
                    <li><Link to="/patient/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                    <li><Link to=""><box-icon name='info-circle' color='#ffffff'></box-icon> About us</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;
