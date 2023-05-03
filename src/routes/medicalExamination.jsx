import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { findExaminationById } from "../api"; 

export async function loader({ params }) {
  const examination = await findExaminationById(params.examinationId);
  if (!examination) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { examination };
}

function MedicalExamination() {
  const { examination } = useLoaderData();

  return (
    examination ? (
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
    ) : (
      <div>Loading...</div>
    )
  );
}

export default MedicalExamination;