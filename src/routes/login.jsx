import { Form } from "react-router-dom";
import { authenticate } from "../api";
import { useState } from "react";
import "../index.css";

export default function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");


    function handleSubmit(){
        authenticate(email, password);
    }

    function changeEmail(e){
        setEmail(e.target.value);
    }

    function changePassword(e){
        setPassword(e.target.value);
    }

    return (
        <>
            <div id="login">
                            <Form onSubmit={handleSubmit}>
                                <label>
                                    Email:
                                    <input type="text" value={email} onChange={changeEmail} />
                                </label>
                                <label>
                                    Password:
                                    <input type="text" value={password} onChange={changePassword} />
                                </label>
                                <button type="submit">Conferma</button>
                            </Form>
                        </div>
        </>
    )
}