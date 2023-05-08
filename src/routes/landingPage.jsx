import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { MdAppRegistration } from "react-icons/md";

export default function LandingPage() {
    return (
        <>
        
            <div id="sidebar">
                <h1>Progetto Medici - Home Page</h1>
                <nav>
                    <ul>

                        <li>
                            <NavLink to="/patientLogin">Login Paziente <AiOutlineLogin/> </NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctorLogin">Login Dottore <AiOutlineLogin/> </NavLink>
                        </li>
                    </ul>
                </nav>

                <h2>Non sei ancora registrato?</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/patientRegistration">Registrazione Paziente <MdAppRegistration/> </NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctorRegistration">Registrazione Dottore <MdAppRegistration/> </NavLink>
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