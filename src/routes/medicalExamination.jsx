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
        <div id="exam" class="container text-center">
          <div class="row">
            <div class="col">
              {!isDoctor && !isProgrammed && <button onClick={AcceptExamination}>Accetta Visita</button>}
            </div>
            <div class="col">
              {!isAnnulledOrDone && <button onClick={AnnulExamination}>Annulla Visita</button>}
            </div>
          </div>
          <div id="headExam" class="row">
            <div id='head' class="col">
              {examination.state}
            </div>
            <div id='name' class="col-6">
              {examination.patientName}
            </div>
            <div id='head' class="col">
              {examination.reservationDate}
            </div>
          </div>
          <div class="row">
            <div class="col">
              Medico: {examination.doctorName}
            </div>
            <div class="col">
              Tipo di Visita: {examination.specialization}
            </div>
          </div>
          <div class="row">
            <div class="col">
              Tipo di Contatto: {examination.contact}
            </div>
            <div class="col">
              Pacchetto: {examination.examinationPackage}
            </div>
          </div>
          <div id="sezNote" class="row">
            <div class="col-1">
              Note:
            </div>
            <div id="note" class="col">
              {examination.note}
            </div>
          </div>
          <div class="row">
            <div class="col">
              Tipo di Pagamento: {examination.payment}
            </div>
          </div>
          <div class="row">
            <div class="col">
              Note di Pagamento: {examination.paymentNote}
            </div>
          </div>
        </div>
    </>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default MedicalExamination;