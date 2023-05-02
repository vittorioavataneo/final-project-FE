import { Form, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createNewExamination, findDoctorBySpecialization, findPatientById, findSpecializationByName, findDoctorById } from "../api";

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

    function handleSubmit(){
        createNewExamination(
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
            <div id="registrazione">
                <h2>Richiesta Visita</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        Tipo di Visita:
                        <input type="text" value={specializationName} onChange={changeSpecializationName} required/>
                    </label>
                    <label>
                        Dottore:
                        <select value={doctorId} onChange={changeDoctorId} required>
                            {doctorList.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.firstname} {doctor.lastname}
                            </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Data:
                        <input type="date" value={reservationDate} onChange={changeReservationDate} required/>
                    </label>
                    <label>
                        Tipo di contatto:
                        <select value={contact} onChange={changeContact} required>
                            <option value="INTERVISTA">INTERVISTA</option>
                            <option value="VISITA">VISITA</option>
                        </select>
                    </label>
                    <label>
                        Pagamento:
                        <select value={payment} onChange={changePayment} required>
                            <option value="BONIFICO">BONIFICO</option>
                            <option value="SATISPAY">SATISPAY</option>
                            <option value="PAYPAL">PAYPAL</option>
                            <option value="CARTA_DI_CREDITO_O_DEBITO">CARTA_DI_CREDITO_O_DEBITO</option>
                            <option value="CONTANTI">CONTANTI</option>
                        </select>
                    </label>
                    <label>
                        Pacchetto:
                        <select value={examinationPackage} onChange={changeExaminationPackage} required>
                            <option value="CORPO_MENTE">CORPO_MENTE</option>
                            <option value="CORPO">CORPO</option>
                            <option value="MENTE">MENTE</option>
                        </select>
                    </label>
                    <label>
                        Note:
                        <input type="text" value={note} onChange={changeNote} />
                    </label>
                    <label>
                        Note Pagamento:
                        <input type="text" value={paymentNote} onChange={changePaymentNote} />
                    </label>
                    <label>
                        Fatturazione:
                        <input type="checkbox" checked={billing} onChange={changeBilling}/>
                    </label>
                    <button type="submit">Invia richiesta</button>
                </Form>
            </div>
        </>
    );
}