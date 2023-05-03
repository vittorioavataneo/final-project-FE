import { Outlet, useParams, NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findPatientById, findAllPatientMedicalExamination } from "../api";

export async function loader({ params }) {
    const patient = await findPatientById(params.patientId);
    const medicalExams = await findAllPatientMedicalExamination(params.patientId);
    if (!patient) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { patient, medicalExams };
  }

export default function PatientDetails() {
    const { userId } = useParams();
    const [medicalExaminations, setMedicalExaminations] = useState([]);
    const navigate = useNavigate();

    const { patient, medicalExams } = useLoaderData();

    return (
        <>
            <div>
                <h1>Dettagli Paziente</h1>
                <div>
                    <ul>
                        <li>{patient.firstname}</li>
                        <li>{patient.lastname}</li>
                        <li>{patient.dob}</li>
                        <li>{patient.sex}</li>
                        <li>{patient.cellNumber}</li>
                        <li>{patient.taxCode}</li>
                    </ul>
                </div>
                <h3>Cronologia Visite Mediche</h3>
                <nav>
                    {medicalExams.length ? (
                        <ul>
                            {medicalExams.map((examination) => (
                                <li key={examination.id}>
                                    <NavLink
                                        to={`/doctor/${userId}/patients/${patient.id}/examination/${examination.id}`}
                                    >
                                        {examination.reservationDate}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>Nessuna Visita</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
           
        </>
    );
}