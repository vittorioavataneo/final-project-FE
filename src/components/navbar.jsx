import { NavLink } from 'react-router-dom';
import './navbar.css';
import { AiFillHome } from "react-icons/ai";

function Navbar() {
  return (
    <>
        <nav className="navbar">
            <NavLink to="/">
                Home <AiFillHome/>
            </NavLink>
        </nav>
    </>
  );
}

export default Navbar;
