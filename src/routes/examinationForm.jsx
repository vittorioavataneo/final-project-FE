import { Form, useParams } from "react-router-dom";
import { useState } from "react";
import { createNewExamination } from "../api";

export default function ExaminationForm(){

    const { userId } = useParams();

    const[patientName, setPatientName] = useState("")
    const[doctorName, setDoctorName] = useState("");
    const[reservationDate, setReservationDate] = useState("");
    const[contact, setContact] = useState("");
    const[specializationName, setSpecializationName] = useState("");
    const[payment, setPayment] = useState("");
    const[examinationPackage, setExaminationPackage] = useState("");
    const[note, setNote] = useState("");
    const[paymentNote, setPaymentNote] = useState(""); 
    const[billing, setBilling] = useState();
    const[state, setState] = useState("DA_PROGRAMMARE");

    function handleSubmit(){
        createNewExamination(doctorName, patientName, reservationDate, contact, specializationName, payment, examinationPackage, note, paymentNote, billing, state);
    }

    function changePatientName(e){
        setPatientName(e.target.value);
    }

    function changeDoctorName(e){
        setDoctorName(e.target.value);
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
        setBilling(e.target.value);
    }

    function changeState(e){
        setState(e.target.value);
    }

    return (
        <>
            <div id="registrazione">
                <h2>Richiesta Visita</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        Tipo di Visita:
                        <input type="date" value={specializationName} onChange={changeSpecializationName} required/>
                    </label>
                    <label>
                        Data:
                        <input type="date" value={reservationDate} onChange={changeReservationDate} required/>
                    </label>
                    <label>
                        Tipo di contatto:
                        <select value={contact} onChange={changeContact} required>
                            <option value="INTERVISTA">INTERVISTA</option>
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
                        <input type="text" value={note} onChange={changeNote} required/>
                    </label>
                    <label>
                        Note Pagamento:
                        <input type="text" value={paymentNote} onChange={changePaymentNote} required/>
                    </label>
                    <label>
                        Fatturazione:
                        <input type="checkbox" value={billing} onChange={changeBilling}/>
                    </label>
                    <button type="submit">Invia richiesta</button>
                </Form>
            </div>
        </>
    );
}