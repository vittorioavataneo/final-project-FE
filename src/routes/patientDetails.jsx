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
            <div id='detPazienti'>
                <h1>Dettagli Paziente</h1>
                <div>
                    <ul>
                        <li>Nome: {patient.firstname}</li>
                        <li>Cognome: {patient.lastname}</li>
                        <li>Data di nascita; {patient.dob}</li>
                        <li>Genere: {patient.sex}</li>
                        <li>Numero di telefono: {patient.cellNumber}</li>
                        <li>Codice Fiscal: {patient.taxCode}</li>
                    </ul>
                </div>
                <h3>Cronologia Visite Mediche</h3>
                <nav>
                    {medicalExams.length ? (
                        <div class="row">
                        {medicalExams.map((examination) => (
                            <div class="col-4">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{examination.reservationDate}</p>
                                        <NavLink
                                            to={`/doctor/${userId}/patients/${patient.id}/examination/${examination.id}`}
                                            class="btn btn-primary"
                                        >
                                            Vai alla visita
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
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