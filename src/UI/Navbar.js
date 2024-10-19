import React from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import "mdb-ui-kit/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useUser } from '../UserContext';  
import logo from '../login/logo.svg';

initMDB({ Dropdown, Collapse });

const Header = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const user_id = query.get('user_id');
    console.log('User ID:', user_id); // test print user_id
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid">
                <button
                    data-mdb-collapse-init
                    className="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <img
                        src={logo}
                        className="re-size"
                        alt="logo image"
                        style={{ maxWidth: "100px", height: "100px" }}
                    />

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/content/Dashboard?user_id=${user_id}`}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/content/Convert?user_id=${user_id}`}>Converter</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={`/content/TransferList?user_id=${user_id}`}>Transfer List</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    <div className="dropdown">
                        <a
                            data-mdb-dropdown-init
                            className="text-reset me-3 dropdown-toggle hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            aria-expanded="false"
                        >
                            <i className="fas fa-bell"></i>
                            <span className="badge rounded-pill badge-notification bg-danger">7</span>
                        </a>
                    </div>

                    <div className="dropdown">
                        <Link
                            data-mdb-dropdown-init
                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            aria-expanded="false"
                            to={`/content/UserInfo?user_id=${user_id}`}
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="rounded-circle"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                                style={{ width: "50px", height: "50px" }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
