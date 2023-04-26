import { Form } from "react-router-dom";
export default function PatientRegistration() {
    return (
        <>
            <div id="registrazione">
                <h2>Registrazione Paziente</h2>
                <Form>
                    <label>
                        Nome:
                        <input type="text" name="nome" />
                    </label>
                    <label>
                        Cognome:
                        <input type="text" name="cognome" />
                    </label>
                    <label>
                        Codice Fiscale:
                        <input type="text" name="codiceFiscale" />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" />
                    </label>
                    <label>
                        Data di Nascita:
                        <input type="text" name="dataNascita" />
                    </label>
                    <label>
                        Sesso:
                        <input type="text" name="sesso" />
                    </label>
                    <label>
                        Numero di Telefono:
                        <input type="text" name="numeroTelefono" />
                    </label>
                    <input type="submit" value="Registrati" />
                </Form>
            </div>
        </>
    );
}