import { Outlet, useParams, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllPatientByDoctorId } from "../api"; 
import pages from "../assets/pages.mp4";


export default function DoctorPatientPage() {
    const { userId } = useParams();
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    async function fetchPatient() {
        try {
            const patient = await findAllPatientByDoctorId(userId);
            setPatients(patient);
        } catch (error) {
            console.error(error);
        }
    }
    fetchPatient();
    }, [userId]);

    return (
        <>
        <video src={pages} autoPlay loop muted/>
        <nav className="navbar">
            <NavLink to="/">
                Home/Logout
            </NavLink>
            <NavLink to={`/doctor/${userId}/patients`}>
                Pazienti
            </NavLink>
            <NavLink to={`/doctor/${userId}/examinations`}>
                Visite Mediche
            </NavLink>
        </nav>

        <div id="sidebar">
            <h1></h1>
            <h3 className='sideHead'>Pazienti</h3>
            <nav>
            {patients.length ? (
                <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        <NavLink 
                            to={`/doctor/${userId}/patients/${patient.id}`}
                        >
                            {patient.firstname} {patient.lastname}
                        </NavLink>
                    </li>
                    ))
                }
                </ul>
                ) : (
                    <p>
                        <i>Nessun Paziente</i>
                    </p>
                )
            }
            </nav>
            
        </div>
        <div id="detail">
            <Outlet/>
        </div>
        </>
    );
}