import { useLoaderData, useParams } from 'react-router-dom';
import React from 'react';
import { findExaminationById, changeExaminationToAnnulled, changeExaminationToProgrammed, findDoctorById, findPatientById } from "../api"; 


export async function loader({ params }) {
  const examination = await findExaminationById(params.examinationId);
  const doc = await findDoctorById(params.userId)
  if (!examination) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { examination, doc };
}

function MedicalExamination() {
  const { examination, doc } = useLoaderData();
  const { userId } = useParams

  const isDoctor = doc.id === userId;
  const isAnnulledOrDone = examination?.state === "Annullato" || examination?.state === "Fatto";
  const isProgrammed = examination?.state === "Annullato" || examination?.state === "Fatto" || examination?.state === "Programmato";

  async function AnnulExamination(){
      await changeExaminationToAnnulled(examination.id);
  } 

  async function AcceptExamination(){
    await changeExaminationToProgrammed(examination.id);
  } 

  return (
    examination ? (
      <>
        {!isAnnulledOrDone && <button onClick={AnnulExamination}>Annulla Visita</button>}
        {!isDoctor && !isProgrammed && <button onClick={AcceptExamination}>Accetta Visita</button>}
        
          <h2>Stato: {examination.state}</h2>
          <h1>Nome Paziente: {examination.patientName}</h1>
          <h2>Data: {examination.reservationDate}</h2>
          <br />
          <p>Medico: {examination.doctorName}</p>
          <p>Tipo di Visita: {examination.specialization}</p>
          <br />
          <p>Tipo di Contatto: {examination.contact}</p>
          <p>Pacchetto: {examination.examinationPackage}</p>
          <br />
          <p>Note: {examination.note}</p>
          <br/>
          <p>Tipo di Pagamento: {examination.payment}</p>
          <br />
          <p>Note di Pagamento: {examination.paymentNote}</p> 
          </>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default MedicalExamination;