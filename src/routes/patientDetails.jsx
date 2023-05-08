import { Outlet, useParams, NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { useState } from "react";
import { findPatientById, findAllPatientMedicalExamination } from "../api";
import { FaFileMedicalAlt } from "react-icons/fa";

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
            <div id='detPazienti' key={patient.id}>
                <h1 id="detPaz">Dettagli Paziente</h1>
                <div id="headExam" class="row">
                    <div id='head' class="col">
                        Nome: {patient.firstname}
                    </div>
                    <div id='head' class="col">
                        Cognome: {patient.lastname}
                    </div>
                </div>
                <div id="headExam" class="row">
                    <div id='head' class="col">
                        Data di nascita: {patient.dob}
                    </div>
                    <div id='head' class="col">
                        Genere: {patient.sex}
                    </div>
                </div>
                <div id="headExam" class="row">
                    <div id='head' class="col">
                        Numero di telefono: {patient.cellNumber}
                    </div>
                    <div id='head' class="col">
                        Codice Fiscal: {patient.taxCode}
                    </div>
                </div>
                <h3 id="cronologiaExam">Cronologia Visite Mediche</h3>
                <nav id='container'>
                    {medicalExams.length ? (
                        <div class="row">
                        {medicalExams.map((examination) => (
                            <div id="cardSect" class="col-4">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{examination.specialization} <FaFileMedicalAlt/> </p>
                                        <NavLink
                                            to={`/doctor/${userId}/patients/${patient.id}/examination/${examination.id}`}
                                            class="btn btn-primary"
                                            id="cardDate"
                                        >
                                            {examination.reservationDate}
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