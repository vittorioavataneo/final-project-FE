import { Outlet, useParams, NavLink } from 'react-router-dom';
import IndexPage from './index';
import { FaFileMedicalAlt } from "react-icons/fa";

export default function DoctorPage() {
    const { userId } = useParams();

    return (
        <>
        <nav className="navbar">
            <NavLink to="/">
                Home/Logout
            </NavLink>
            <NavLink to={`/doctor/${userId}/patients`}>
                Pazienti
            </NavLink>
            <NavLink to={`/doctor/${userId}/examinations`}>
                Visite Mediche <FaFileMedicalAlt/>
            </NavLink>
        </nav>
        <div>
            <Outlet/>
        </div>
    
        </>
    );
}