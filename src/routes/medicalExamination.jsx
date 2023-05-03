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
        
        <ul key={examination.id}>
          <li>{examination.doctorName}</li>
          <li>{examination.patientName}</li>
          <li>{examination.reservationDate}</li>
          <li>{examination.contact}</li>
          <li>{examination.specialization}</li>
          <li>{examination.payment}</li>
          <li>{examination.examinationPackage}</li>
          <li>{examination.note}</li>
          <li>{examination.paymentNote}</li>
          <li>{examination.billing}</li>
          <li>{examination.state}</li>     
        </ul>
      </>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default MedicalExamination;