import React from 'react';

function MedicalExamination({ medicalExaminations }) {
  return (
    <ul>
      {medicalExaminations.map(medicalExamination => (
        <li key={medicalExamination.id}>
          <div>{medicalExamination.billing}</div>
          <div>{medicalExamination.doctor}</div>
          <div>{medicalExamination.patient}</div>
          <div>{medicalExamination.reservationDate}</div>
          <div>{medicalExamination.contact}</div>
          <div>{medicalExamination.specialization}</div>
          <div>{medicalExamination.payment}</div>
          <div>{medicalExamination.paymentNote}</div>
          <div>{medicalExamination.examinationPackage}</div>
          <div>{medicalExamination.note}</div>
          <div>{medicalExamination.state}</div>     
        </li>
      ))}
    </ul>
  );
}

export default MedicalExamination;