import { Outlet, useParams, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllDoctorMedicalExamination } from "../api"; 

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
        navigate(`/doctor/${userId}/createExamination`);
    }

    return (
        <>
        <div id="sidebar">
            <h1>Benvenuto, utente {userId}</h1>
            <button onClick={changePage}>Aggiungi Visita</button>
            <h3>Cronologia Visite Mediche</h3>
            <nav>
            {medicalExaminations.length ? (
                <ul>
                {medicalExaminations.map((examination) => (
                    <li key={examination.id}>
                        <NavLink 
                            to={`/doctor/${userId}/examination/${examination.id}`}
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