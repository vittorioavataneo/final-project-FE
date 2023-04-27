import { Form } from "react-router-dom";
import { useState } from "react";
import { registerPatient } from "../api";

export default function PatientRegistration() {

        const[firstname, setFirstname] = useState("");
        const[lastname, setLastname] = useState("");
        const[dob, setDob] = useState("");
        const[email, setEmail] = useState("");
        const[password, setPassword] = useState("");
        const[taxCode, setTaxCode] = useState("");
        const[cellNumber, setCellNumber] = useState("");
        const[sex, setSex] = useState("");
    
        function handleSubmit(){
            registerPatient(firstname, lastname, dob, cellNumber, sex, email, password, taxCode);
        }
    
        function changeFirstname(e){
            setFirstname(e.target.value);
        }
    
        function changeLastname(e){
            setLastname(e.target.value);
        }
    
        function changeDob(e){
            setDob(e.target.value);
        }
    
        function changeEmail(e){
            setEmail(e.target.value);
        }
    
        function changePassword(e){
            setPassword(e.target.value);
        }

        function changeTaxCode(e){
            setTaxCode(e.target.value);
        }

        function changeCellNumber(e){
            setCellNumber(e.target.value);
        }

        function changeSex(e){
            setSex(e.target.value);
        }

    return (
        <>
            <div id="registrazione">
                <h2>Registrazione Paziente</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" value={firstname} onChange={changeFirstname} required/>
                    </label>
                    <label>
                        Cognome:
                        <input type="text" value={lastname} onChange={changeLastname} required/>
                    </label>
                    <label>
                        Data di Nascita:
                        <input type="date" value={dob} onChange={changeDob} required/>
                    </label>
                    <label>
                        Numero di Telefono:
                        <input type="text" value={cellNumber} onChange={changeCellNumber} minLength={10} maxLength={10}/>
                    </label>
                    <label>
                        Sesso:
                        <select value={sex} onChange={changeSex} required>
                            <option value="UOMO">Uomo</option>
                            <option value="DONNA">Donna</option>
                            <option value="NON_BINARIO">Non Binario</option>
                        </select>
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={changeEmail} required/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={changePassword} required/>
                    </label>
                    <label>
                        Codice Fiscale:
                        <input type="text" value={taxCode} onChange={changeTaxCode} minLength={16} maxLength={16} required/>
                    </label>
                    <button type="submit">Registrati</button>
                </Form>
            </div>
        </>
    );
}