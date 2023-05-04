import { Outlet, useParams, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllDoctorMedicalExamination } from "../api"; 
import pages from "../assets/pages.mp4";

export default function DoctorExaminationPage() {
    const { userId } = useParams();
    const [medicalExaminations, setMedicalExaminations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    async function fetchMedicalExaminations() {
        try {
            const medicalExams = await findAllDoctorMedicalExamination(userId);
            setMedicalExaminations(medicalExams);
        } catch (error) {
            console.error(error);
        }
    }
    fetchMedicalExaminations();
    }, [userId]);

    function changePage(){
        navigate(`/doctor/${userId}/examinations/createExamination`);
    }

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
            <h3 className='sideHead'>Cronologia Visite Mediche</h3>
            <nav>
            {medicalExaminations.length ? (
                <ul>
                {medicalExaminations.map((examination) => (
                    <li key={examination.id}>
                        <NavLink 
                            to={`/doctor/${userId}/examinations/${examination.id}`}
                        >
                            {examination.patientName} - {examination.reservationDate}
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