import { useLoaderData, useParams, Form, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { findExaminationById, changeExaminationToAnnulled, changeExaminationToProgrammed, findDoctorById, updateExamination, findPatientByExamId } from "../api"; 


export async function loader({ params }) {
  const examination = await findExaminationById(params.examinationId);
  const doc = await findDoctorById(params.userId);
  const pat = await findPatientByExamId(params.examinationId);
  console.log(pat);
  if (!examination) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { examination, doc, pat };
}

function Edit() {
  const { examination, doc, pat } = useLoaderData();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [newDate, setNewDate] = useState(examination.reservationDate);

  const isDoctor = doc.id === userId;
  const isAnnulledOrDone = examination?.state === "Annullato" || examination?.state === "Fatto";
  const isProgrammed = examination?.state === "Annullato" || examination?.state === "Fatto" || examination?.state === "Programmato";

  async function AnnulExamination(){
      await changeExaminationToAnnulled(examination.id)
      .then(() => {
        navigate(`/doctor/${userId}/examinations/${examination.id}`);
      });
  } 

  async function AcceptExamination(){
      await changeExaminationToProgrammed(examination.id)
      .then(() => {
        navigate(`/doctor/${userId}/examinations/${examination.id}`);
      });
  } 

  async function SaveExamination(){
    const note = document.querySelector('textarea[name="notes"]').value;
    examination.note = note;
    examination.reservationDate = newDate;
    await updateExamination(examination, examination.id, doc, pat, doc.specialization)
    .then(() => {
      navigate(`/doctor/${userId}/examinations/${examination.id}`);
    });
  }

  function handleDateChange(event) {
    setNewDate(event.target.value);
  }

  return (
    examination ? (
      <>
        <div id="exam" class="container text-center">
          <div class="row">
            <div class="col">
              {!isDoctor && !isProgrammed && <button className='examButton' onClick={AcceptExamination}>Accetta Visita</button>}
            </div>
            <div class="col">
                <button className='examButton' onClick={SaveExamination}>Salva</button>
            </div>
            <div class="col">
              {!isAnnulledOrDone && <button className='examButton' onClick={AnnulExamination}>Annulla Visita</button>}
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
              <input type="date" name="reservationDate" value={newDate} onChange={handleDateChange} />
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
              Referto:
            </div>
            <div id="note" class="col">
                <label className='textNote'>
                    <textarea
                    name="notes"
                    className='textNote'
                    defaultValue={examination.note}
                    rows={6}
                    />
                </label>
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

export default Edit;