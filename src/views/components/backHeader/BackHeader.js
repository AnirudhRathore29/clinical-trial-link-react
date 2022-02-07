import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { InputText, SelectBox } from "../Common/Inputs/Inputs";
import { toast } from "react-toastify";
import { Dropdown } from 'react-bootstrap';
import RadioBtn from "../Common/RadioBtn/RadioBtn";
import Button from '../Common/Buttons/Buttons';
import 'boxicons';
import "./BackHeader.css";

const Header = ({ colorHeader }) => {
    const [scroll, setScroll] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);
    const [rightPanel, setRightPanel] = useState(false);
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

    const ToggleSidemenu = () => {
        setSideMenu(!sideMenu);
    }
    const rightPanelClick = () => {
        setRightPanel(!rightPanel);
    }

    return (
        <>
            <header className={scroll ? "dashboard-header sticky" : `dashboard-header ${colorHeader}`}>
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
                                <button className="filter-btn" onClick={rightPanelClick}><img src="/images/filter.svg" alt="icon" /></button>
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
                                    <Link to="/" className="dropdown-item"><box-icon name='message-rounded-dots' ></box-icon> My Chats</Link>
                                    <Link to="/" className="dropdown-item"><box-icon name='history' ></box-icon> Payment History</Link>
                                    <Link to="/" className="dropdown-item"><box-icon name='log-out-circle' ></box-icon> Logout</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className={rightPanel ? "right-panel active" : "right-panel"}>
                <h2>Search Filter <button onClick={rightPanelClick}><box-icon name='x' size="35px"></box-icon></button></h2>
                <div className="rightPanelInner">
                    <SelectBox
                        name="condition"
                        labelText="Condition"
                        optionData={
                            <>
                                <option>Select</option>
                                <option>Conidtion 1</option>
                                <option>Conidtion 2</option>
                            </>
                        }
                    />
                    <div className="form-group">
                        <label>Gender</label>
                        <div className="gender-row mt-4">
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" defaultChecked="true" />
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                        </div>
                    </div>
                    <InputText type="text" labelText="Zip Code" placeholder="Enter zip code" />
                    <InputText type="search" labelText="Keywords" placeholder="Enter Keywords" />
                    <Button
                        isButton="true"
                        BtnType="submit"
                        BtnColor="green w-100"
                        BtnText="Apply"
                        onClick={rightPanelClick}
                    />
                </div>
            </div>

            <div className={sideMenu ? "side-menu active" : "side-menu"}>
                <ul>
                    <li><Link to="/patient/dashboard" className="active"><box-icon type='solid' name='dashboard' color='#ffffff'></box-icon> Dashboard</Link></li>
                    <li><Link to=""><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> Appointments</Link></li>
                    <li><Link to=""><box-icon name='bank' type='solid' color='#ffffff'></box-icon> Bank Details</Link></li>
                    <li><Link to=""><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;
