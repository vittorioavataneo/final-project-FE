import { NavLink, Outlet } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
        
            <div id="sidebar">
                <h1>Progetto Medici - General Login</h1>
                <nav>
                    <ul>

                        <li>
                            <NavLink to="/patientLogin">Login Paziente</NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctorLogin">Login Dottore</NavLink>
                        </li>
                        <li>
                            <NavLink to="/adminLogin">Login Admin</NavLink>
                        </li>
                    </ul>
                </nav>

                <h2>Non sei ancora registrato?</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/patientRegistration">Registrazione Paziente</NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctorRegistration">Registrazione Dottore</NavLink>
                        </li>
                    </ul>
                </nav>
            </div >

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}