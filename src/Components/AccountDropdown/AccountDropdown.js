import React from 'react'
import './AccountDropdown.scss'
import { Link } from 'react-router-dom'
import { auth } from "../Firebase/Firebase"
import { RiAccountCircleLine } from "react-icons/ri"
import { AiOutlineHistory, AiOutlineLogout } from "react-icons/ai"

function AccountDropdown() {

    // Functions

    const handleLogout = (e) => {
        auth.signOut().then(() => {
            console.log("Signed out succesfully!");
        }).catch((err) => alert(err.message));
    }

    return (
        <div className="accdrop">
            <ul>
                <li><RiAccountCircleLine className="accdrop__icon"/> <Link to="/account">My Account</Link></li>
                <li><AiOutlineHistory className="accdrop__icon"/> <Link to="/account/history">Order History</Link></li>
                <li onClick={handleLogout}><AiOutlineLogout className="accdrop__icon"/> <p>Log Out</p></li>
            </ul>
        </div>
    )
}

export default AccountDropdown
