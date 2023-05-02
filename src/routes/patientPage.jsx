import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function PatientPage() {
    const { userId } = useParams();
    const [medicalExaminations, setMedicalExaminations] = useState([]);

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

    return (
        <>
        <div id="sidebar">
            <h1>Benvenuto, utente {userId}</h1>
            <h3>Cronologia Visite Mediche</h3>
            <nav>
            {medicalExaminations.length ? (
                <ul>
                {medicalExaminations.map((examination) => (
                    <li key={examination.id}>
                        <NavLink >
                            
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