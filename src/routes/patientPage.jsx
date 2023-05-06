import { Outlet, useParams, NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllPatientMedicalExamination, createNewExamination } from "../api"; 
import pages from "../assets/pages.mp4";

export async function loader({ params }) {
  const medicalExaminations = await findAllPatientMedicalExamination(params.userId);
  if (!medicalExaminations) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { medicalExaminations };
}


export async function createExamination(userId, navigate, doctor, 
    patient, 
    reservationDate,
    contact, 
    specialization, 
    payment, 
    examinationPackage, 
    note, 
    paymentNote, 
    billing, 
    state) {
  const examination = await createNewExamination(doctor, 
    patient, 
    reservationDate,
    contact, 
    specialization, 
    payment, 
    examinationPackage, 
    note, 
    paymentNote, 
    billing, 
    state);
  navigate(`/patient/${userId}/examination/${examination.id}`);
}

export default function PatientPage() {
  const { medicalExaminations } = useLoaderData();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [examinations, setExaminations] = useState(medicalExaminations);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setExaminations(medicalExaminations);
  }, [medicalExaminations, reload]);

  function changePage(){
    navigate(`/patient/${userId}/createExamination`);
  }

  function handleReload() {
    setReload(true);
  }



  return (
    <>
      <video src={pages} autoPlay loop muted/>
      <nav className="navbar">
        <NavLink to="/">
          Home/Logout
        </NavLink>
      </nav>
      
      <div id="sidebar">
        <h1></h1>
        <button className='bottone' onClick={changePage}>Prenota Visita</button>
        <h3>Cronologia Visite Mediche</h3>
        <nav>
          {examinations.length ? (
            <ul>
              {examinations.map((examination) => (
                <li key={examination.id}>
                  <NavLink to={`/patient/${userId}/examination/${examination.id}`}>
                    {examination.specialization} - {examination.reservationDate}
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
      <Outlet handleReload={handleReload} />
      </div>
    </>
  );
}