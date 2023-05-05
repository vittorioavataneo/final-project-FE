import { Form, useSubmit, Outlet, useParams, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { findAllPatientByDoctorId, findPatientByName } from "../api"; 
import pages from "../assets/pages.mp4";


export default function DoctorPatientPage() {
    const { userId } = useParams();
    const [patients, setPatients] = useState([]);
    const [searching, setSearching] = useState(false);
    const [q, setQ] = useState("");
    const navigate = useNavigate();
    const submit = useSubmit();

    useEffect(() => {
    async function fetchPatient() {
        try {
            const patient = await findAllPatientByDoctorId(userId);
            setPatients(patient);
        } catch (error) {
            console.error(error);
        }
    }
    fetchPatient();
    }, [userId]);

    const handleSearch = async (event) => {
        setSearching(true);
        setQ(event.currentTarget.value);
        try {
            const results = await findPatientByName(event.currentTarget.value, userId);
            setPatients(results);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    return (
        <>
        <video src={pages} autoPlay loop muted/>
        <nav className="navbar">
            <NavLink to="/">
                Home/Logout
            </NavLink>
            <NavLink to={`/doctor/${userId}/patients`}>
                Pazienti
            </NavLink>
            <NavLink to={`/doctor/${userId}/examinations`}>
                Visite Mediche
            </NavLink>
        </nav>

        <div id="sidebar">
            <h1></h1>
            <h3 className='sideHead'>Pazienti</h3>
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
            {patients.length ? (
                <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        <NavLink 
                            to={`/doctor/${userId}/patients/${patient.id}`}
                        >
                            {patient.firstname} {patient.lastname}
                        </NavLink>
                    </li>
                    ))
                }
                </ul>
                ) : (
                    <p>
                        <i>Nessun Paziente</i>
                    </p>
                )
            }
            </nav>
            
        </div>
        <div id="detail">
            <Outlet/>
        </div>
        </>
    );
}