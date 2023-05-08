import { Form, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findDoctorBySpecialization, 
    findPatientById, 
    findSpecializationByName, 
    findDoctorById } from "../api";
import {createExamination} from "../routes/patientPage";
import { GiPlagueDoctorProfile } from "react-icons/gi";

export default function ExaminationForm(){

    const { userId } = useParams();

    const[patient, setPatient] = useState({});
    const[doctor, setDoctor] = useState({});
    const[reservationDate, setReservationDate] = useState("");
    const[contact, setContact] = useState("");
    const[specializationName, setSpecializationName] = useState("");
    const[payment, setPayment] = useState("");
    const[examinationPackage, setExaminationPackage] = useState("");
    const[note, setNote] = useState("");
    const[paymentNote, setPaymentNote] = useState(""); 
    const[billing, setBilling] = useState(true);
    const[state, setState] = useState("DA_PROGRAMMARE");
    const[specialization, setSpecialization] = useState({}); 
    const[doctorList, setDoctorList] = useState([]);
    const[doctorId, setDoctorId] = useState("");
    const navigate = useNavigate();

    function handleSubmit(){
        createExamination(
            userId,
            navigate,
            doctor, 
            patient, 
            reservationDate,
            contact, 
            specialization, 
            payment, 
            examinationPackage, 
            note, 
            paymentNote, 
            billing, 
            state
        );
            
    }

    useEffect(()=>{
        async function fetchPatient(){
            const pat = await findPatientById(userId);
            setPatient(pat);
        }

        fetchPatient()
    }, [userId]);


    useEffect(()=>{
        async function fetchSpecialization(){
            const sp = await findSpecializationByName(specializationName);
            setSpecialization(sp);
        }

        if (specializationName !== "") {
            fetchSpecialization();
        }
    }, [specializationName]);


    useEffect(()=>{
        async function fetchDoctor(){
            const did = await findDoctorById(doctorId);
            setDoctor(did);
            console.log(JSON.stringify(doctor));
        }

        if ( doctorId !== "") {
            fetchDoctor();
          }
    }, [doctorId]);

    function changePatient(e){
        setPatient(e.target.value);
    }

    function changeDoctor(e) {
        setDoctor(e.target.value);
    }

    function changeReservationDate(e){
        setReservationDate(e.target.value);
    }

    function changeContact(e){
        setContact(e.target.value);
    }

    function changeSpecializationName(e){
        setSpecializationName(e.target.value);
    }

    function changePayment(e){
        setPayment(e.target.value);
    }

    function changeExaminationPackage(e){
        setExaminationPackage(e.target.value);
    }

    function changeNote(e){
        setNote(e.target.value);
    }

    function changePaymentNote(e){
        setPaymentNote(e.target.value);
    }

    function changeBilling(e){
        setBilling(e.target.checked);
    }

    function changeState(e){
        setState(e.target.value);
    }

    function changeDoctorId(e) {
        setDoctorId(e.target.value);
    }

    useEffect(() => {
        async function fetchDoctors() {
          const doctors = await findDoctorBySpecialization(specializationName);
          setDoctorList(doctors);
        }
    
        if (specializationName !== "") {
          fetchDoctors();
        }
    }, [specializationName]);

    return (
        <>
            <h2 className="TR">Richiesta Visita</h2>
            <div id="registrazione">
                <Form onSubmit={handleSubmit}>
                    <label>
                        Tipo di Visita:
                        <input type="text" value={specializationName} onChange={changeSpecializationName} required/>
                    </label>
                    <label>
                        Dottore <GiPlagueDoctorProfile/>:
                        <select value={doctorId} onChange={changeDoctorId} required>
                            <option>---</option>
                            {doctorList.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.firstname} {doctor.lastname}
                            </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Data:
                        <input type="date" value={reservationDate} onChange={changeReservationDate} required/>
                    </label>
                    <br />
                    <label>
                        Tipo di contatto:
                        <select value={contact} onChange={changeContact} required>
                            <option>---</option>
                            <option value="INTERVISTA">INTERVISTA</option>
                            <option value="PREVENTIVA">PREVENTIVA</option>
                            <option value="PERIODICA">PERIODICA</option>
                            <option value="VISITA">VISITA</option>
                            <option value="SPECIALISTICA">SPECIALISTICA</option>
                            <option value="URGENTE">URGENTE</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Pagamento:
                        <select value={payment} onChange={changePayment} required>
                            <option>---</option>
                            <option value="BONIFICO">BONIFICO</option>
                            <option value="SATISPAY">SATISPAY</option>
                            <option value="PAYPAL">PAYPAL</option>
                            <option value="CARTA_DI_CREDITO_O_DEBITO">CARTA_DI_CREDITO_O_DEBITO</option>
                            <option value="CONTANTI">CONTANTI</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Pacchetto:
                        <select value={examinationPackage} onChange={changeExaminationPackage} required>
                            <option>---</option>
                            <option value="CORPO_MENTE">CORPO_MENTE</option>
                            <option value="CORPO">CORPO</option>
                            <option value="MENTE">MENTE</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Note:
                        <input type="text" value={note} onChange={changeNote} />
                    </label>
                    <br />
                    <label>
                        Note Pagamento:
                        <input type="text" value={paymentNote} onChange={changePaymentNote} />
                    </label>
                    <br />
                    <label>
                        Fatturazione:
                        <input type="checkbox" checked={billing} onChange={changeBilling}/>
                    </label>
                    <br />
                    <button type="submit">Invia richiesta</button>
                </Form>
            </div>
        </>
    );
}