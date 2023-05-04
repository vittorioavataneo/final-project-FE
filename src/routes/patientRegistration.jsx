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
         <h2 className="TR">Registrazione Paziente</h2>
            <div id="registrazione">
               
                <Form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" value={firstname} onChange={changeFirstname} required/>
                    </label>
                    <label>
                        Cognome:
                        <input type="text" value={lastname} onChange={changeLastname} required/>
                    </label>
                    <br/>
                    <label>
                        Data di Nascita:
                        <input type="date" value={dob} onChange={changeDob} required/>
                    </label>
                    <br/>
                    <label>
                        Sesso:
                        <select value={sex} onChange={changeSex} required>
                            <option>---</option>
                            <option value="UOMO">UOMO</option>
                            <option value="DONNA">DONNA</option>
                            <option value="NON_BINARIO">NON_BINARIO</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Codice Fiscale:
                        <input type="text" value={taxCode} onChange={changeTaxCode} minLength={16} maxLength={16} required/>
                    </label>
                    <br/>
                    <label>
                        Numero di Telefono:
                        <input type="text" value={cellNumber} onChange={changeCellNumber} minLength={10} maxLength={10}/>
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={changeEmail} required/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={changePassword} required/>
                    </label>
                    <br/>
                    <button type="submit">Registrati</button>
                </Form>
            </div>
        </>
    );
}