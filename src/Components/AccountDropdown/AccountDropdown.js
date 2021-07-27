import React from 'react'
import './AccountDropdown.scss'
import { Link } from 'react-router-dom'

function AccountDropdown() {
    return (
        <div className="accdrop">
            <ul>
                <li><Link>My Account</Link></li>
                <li><Link>Information</Link></li>
                <li><Link>Order History</Link></li>
                <li><Link>Log Out</Link></li>
            </ul>
        </div>
    )
}

export default AccountDropdown
