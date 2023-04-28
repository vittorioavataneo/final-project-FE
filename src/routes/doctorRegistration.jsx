import { useState } from "react";
import { Form } from "react-router-dom";
import { registerDoctor } from "../api";

export default function DoctorRegistration() {
    const[firstname, setFirstname] = useState("");
        const[lastname, setLastname] = useState("");
        const[dob, setDob] = useState("");
        const[email, setEmail] = useState("");
        const[password, setPassword] = useState("");
        const[taxCode, setTaxCode] = useState("");
        const[cellNumber, setCellNumber] = useState("");
        const[sex, setSex] = useState("");
        const[street, setStreet]= useState("");
        const[cap,setCap]=useState("");
        const[city,setCity]=useState("");
        const[province,setProvince]=useState("");
        const[country,setCountry]=useState("");
        const[doctorCode, setDoctorCode]=useState("");
        const[specialization,setSpecialization]=useState("");
        

        function handleSubmit(){
            registerDoctor(firstname,lastname,dob,email,password,
                            taxCode,cellNumber,sex,address,doctorCode,specialization)
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
        function changeAddress(e){
            setAddress(e.target.value);
        }
        function changeDoctorCode(e){
            setDoctorCode(e.target.value);
        }
        function changeSpecialization(e){
            setSpecialization(e.target.value);
        }
        function changeStreet(e){
            setStreet(e.target.value);
        }
        function changeCap(e){
            setCap(e.target.value);
        }
        function changeCity(e){
            setCity(e.target.value);
        }
        function changeProvince(e){
            setProvince(e.target.value);
        }
        function changeCountry(e){
            setCountry(e.target.value);
        }

    
    return (
        <>
            <div id="registrazione">
                <h2>Registrazione Dottore</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" value={firstname} onChange={changeFirstname} required/>
                    </label>
                    <label>
                        Cognome:
                        <input type="text" value={lastname} onChange={changeLastname} required />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={changeEmail} required/>
                    </label>
                    <label>
                        Password:
                        <input type="text"value={password} onChange={changePassword} required />
                    </label>
                    <label>
                        Codice Dottore:
                        <input type="text"value={doctorCode} onChange={changeDoctorCode} required/>
                    </label>
                    <label>
                        Data di Nascita:
                        <input type="text" value={dob} onChange={changeDob} required />
                    </label>
                    <label>
                        Sesso:
                        <select value={sex} onChange={changeSex} required>
                            <option value="UOMO">UOMO</option>
                            <option value="DONNA">DONNA</option>
                            <option value="NON_BINARIO">NON_BINARIO</option>
                        </select>
                    </label>
                    <label>
                        Specializzazione:
                        <input type="text" value={specialization} onChange={changeSpecialization} required />
                    </label>
                    <label>
                        Numero di Telefono:
                        <input type="text" value={cellNumber} onChange={changeCellNumber} required/>
                    </label>
                    <label>
                        Indirizzo:
                        <input type="text" value={street} onChange={changeStreet} required />
                    </label>
                    <label>
                        Città:
                        <input type="text" value={city} onChange={changeCity} required />
                    </label>
                    <label>
                        Provincia:
                        <input type="text" value={province} onChange={changeProvince} required />
                    </label>
                    <label>
                        CAP:
                        <input type="text" value={cap} onChange={changeCap} required />
                    </label>
                    <label>
                        Stato:
                        <input type="text" value={country} onChange={changeCountry} />
                    </label>
                    <button type="submit">Registrati</button>
                </Form>
            </div>

        </>
    );
}