import { NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <>
        <nav className="navbar">
            <NavLink to="/" exact activeClassName="active">
                Home
            </NavLink>
            <NavLink to="/patientLogin" activeClassName="active">
                Login Paziente
            </NavLink>
            <NavLink to="/patientRegistration" activeClassName="active">
                Registrazione Paziente
            </NavLink>
        </nav>
    </>
  );
}

export default Navbar;
