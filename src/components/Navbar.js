import React from 'react'
import './Navbar.scss'

const Navbar = () => {
    return(
        <div className="navbar">
            <div>
                <span>Home Icon</span>
            </div>
            <div>
                <span>About</span>
                <span>Donate</span>
                <span>Contact</span>
            </div>
        </div>
    )
}

export default Navbar