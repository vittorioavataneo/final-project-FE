import { Form, Outlet, useParams, NavLink, useNavigate, useSubmit } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllDoctorMedicalExamination, findExaminationByPatientName } from "../api";
import pages from "../assets/pages.mp4";
import { FaFileMedicalAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

export default function DoctorExaminationPage() {
    
  const { userId } = useParams();
  const [medicalExaminations, setMedicalExaminations] = useState([]);
  const [q, setQ] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();


  useEffect(() => {
    async function fetchMedicalExaminations() {
      try {
        const medicalExams = await findAllDoctorMedicalExamination(userId);
        setMedicalExaminations(medicalExams);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMedicalExaminations();
  }, [userId]);
  

  const handleSearch = async (event) => {
        setSearching(true);
        setQ(event.currentTarget.value);
        try {
            const results = await findExaminationByPatientName(event.currentTarget.value, userId);
            setMedicalExaminations(results);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };


  return (
    <>
      <video src={pages} autoPlay loop muted />
      <nav className="navbar">
        <NavLink to="/">Home/Logout <AiFillHome/> </NavLink>
        <NavLink to={`/doctor/${userId}/patients`}>Pazienti <BsFillPersonFill/> </NavLink>
        <NavLink to={`/doctor/${userId}/examinations`}>Visite Mediche</NavLink>
      </nav>

      <div id="sidebar">
        <h1></h1>
        <h3 className="sideHead">Cronologia Visite Mediche</h3>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={handleSearch}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
        </div>
        <nav>
          {medicalExaminations.length ? (
            <ul>
              {medicalExaminations.map((examination) => (
                <li key={examination.id}>
                  <NavLink to={`/doctor/${userId}/examinations/${examination.id}`}>
                    {examination.patientName} - {examination.reservationDate} <FaFileMedicalAlt/>
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