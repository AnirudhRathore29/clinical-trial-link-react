import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown } from 'react-bootstrap';
import SearchBx from '../SearchBx/SearchBx'
import 'boxicons';
import "./BackHeader.css";

const Header = ({ colorHeader, headerColor }) => {
    const [sideMenu, setSideMenu] = useState(false);
    const validateUser = localStorage.getItem("userType")
    const history = useHistory();

    toast.configure();

    const Logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userType");
        history.push("/login")
    };

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
                            <SearchBx
                                placeholder={
                                    validateUser === "Patient" ? "Search for Trial" : validateUser === "Trial_Clinic" ? "Search for Sponsor" : validateUser === "Physician" ? "Search for Trial" : validateUser === "Pharmaceutical_Companies" ? "Search for Clinics" : null
                                }
                            />
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
                                    <Link to={`${validateUser === "Patient" ? "/patient" : validateUser === "Trial_Clinic" ? "/trial-clinic" : validateUser === "Physician" ? "/physician" : validateUser === "Pharmaceutical_Companies" ? "/trial-sponsors" : null}/edit-profile`} className="dropdown-item"><box-icon name='edit-alt'></box-icon> Edit Profile</Link>
                                    <Link to={`${validateUser === "Patient" ? "/patient" : validateUser === "Trial_Clinic" ? "/trial-clinic" : validateUser === "Physician" ? "/physician" : validateUser === "Pharmaceutical_Companies" ? "/trial-sponsors" : null}/my-chats`} className="dropdown-item"><box-icon name='message-rounded-dots' ></box-icon> My Chats</Link>
                                    {validateUser === "Patient" ?
                                        <Link to="/patient/my-favorites" className="dropdown-item"><box-icon name='happy-heart-eyes'></box-icon> My favorite Trials</Link>
                                        :
                                        null
                                    }
                                    <button to="/" className="dropdown-item" onClick={Logout}><box-icon name='log-out-circle' ></box-icon> Logout</button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className={sideMenu ? "side-menu active" : "side-menu"}>
                <ul>
                    <li><Link to={`${validateUser === "Patient" ? "/patient" : validateUser === "Trial_Clinic" ? "/trial-clinic" : validateUser === "Physician" ? "/physician" : validateUser === "Pharmaceutical_Companies" ? "/trial-sponsors" : null}/dashboard`} className="active"><box-icon type='solid' name='dashboard' color='#ffffff'></box-icon> Dashboard</Link></li>
                    {validateUser === "Patient" ?
                        <>
                            <li><Link to="/patient/my-appointments"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> Appointments</Link></li>
                            <li><Link to="/patient/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                        </>
                        :
                        null
                    }

                    {validateUser === "Trial_Clinic" ?
                        <>
                            <li><Link to="/trial-clinic/manage-patient"><box-icon name='user' color='#ffffff'></box-icon> Manage Patient</Link></li>
                            <li><Link to="/trial-clinic/trial-applications"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> Trial Applications</Link></li>
                            <li><Link to="/trial-clinic/my-appointments"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> My Appointments</Link></li>
                            <li><Link to="/trial-clinic/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                        </>
                        :
                        null
                    }

                    {validateUser === "Physician" ?
                        <>
                            <li><Link to="/physician/manage-patient"><box-icon name='user' color='#ffffff'></box-icon> Manage Patient</Link></li>
                        </>
                        :
                        null
                    }

                    {validateUser === "Pharmaceutical_Companies" ?
                        <>
                            <li><Link to="/trial-sponsors/manage-patient"><box-icon name='user' color='#ffffff'></box-icon> Manage Patient</Link></li>
                            <li><Link to="/trial-sponsors/manage-clinics"><box-icon name='plus-medical' color='#ffffff'></box-icon> Manage Clinics</Link></li>
                            <li><Link to="/trial-sponsors/my-studies"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> My Studies</Link></li>
                            <li><Link to="/trial-sponsors/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                        </>
                        :
                        null
                    }
                </ul>
            </div>
        </>
    );
};

export default Header;
