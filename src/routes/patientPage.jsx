import { Outlet, useParams, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllPatientMedicalExamination } from "../api"; 
import pages from "../assets/pages.mp4";




export default function PatientPage() {
    const { userId } = useParams();
    const [medicalExaminations, setMedicalExaminations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    async function fetchMedicalExaminations() {
        try {
            const medicalExams = await findAllPatientMedicalExamination(userId);
            setMedicalExaminations(medicalExams);
        } catch (error) {
            console.error(error);
        }
    }
    fetchMedicalExaminations();
    }, [userId]);

    function changePage(){
        navigate(`/patient/${userId}/createExamination`);
    }

    return (
        <>
        <video src={pages} autoPlay loop muted/>
        <nav className="navbar">
            <NavLink to="/">
                Home/Logout
            </NavLink>
        </nav>
        
        <div id="sidebar">
            <h1>Benvenuto, utente {userId}</h1>
            <button onClick={changePage} >Prenota Visita</button>
            <h3>Cronologia Visite Mediche</h3>
            <nav>
            {medicalExaminations.length ? (
                <ul>
                {medicalExaminations.map((examination) => (
                    <li key={examination.id}>
                        <NavLink 
                            to={`/patient/${userId}/examination/${examination.id}`}
                        >
                            {examination.reservationDate}
                        </NavLink>
                    </li>
                    ))
                }
                </ul>
                ) : (
                    <p>
                        <i>Nessuna Visita</i>
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