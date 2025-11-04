import { Link } from "react-router-dom"
import "./Navbar.css"
import sunrunLogo from "../assets/sunrunLogo.png"

function Navbar() {
    return (
        <nav>
            <div className="nav-logo">
                <img src={sunrunLogo} alt="Sunrun Logo" className="logo" />
                <Link to="/" className="title">Home</Link>
            </div>
            <ul>
                <li> <Link to="/Pages">Pages</Link></li>
                <li> <Link to="/About">About</Link></li>
                <li> <Link to="/Quotes">Quotes</Link></li>
            </ul>

        </nav>
    )
}

export default Navbar