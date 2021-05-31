import React from 'react';
import '../App.css';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return "is-active";
    else return "";
}

const Menu = ({ history }) => (
    <div>
        <div className="bg-primary d-flex align-items-center">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className={`nav-link ${isActive(history, '/')}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive(history, '/users')}`} to="/users">Users</Link>
                </li>
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive(history, '/signin')}`} to="/signin">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive(history, '/signup')}`} to="/signup">Sign Up</Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to={`/findpeople`} className={`nav-link ${isActive(history, `/findpeople`)}`} style={{ color: "#ffffff" }}>Find People</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/user/${isAuthenticated().user._id}`} className={`nav-link ${isActive(history, `/user/${isAuthenticated().user._id}`)}`} style={{ color: "#ffffff" }}>{`${isAuthenticated().user.name}'s profile`}</Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: "#ffffff", cursor: "pointer" }} onClick={() => signout(() => history.push('/'))}>Sign Out</span>
                        </li>
                    </React.Fragment>
                )}
            </ul>

        </div>
    </div>
);

export default withRouter(Menu);