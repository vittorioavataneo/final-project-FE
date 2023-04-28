import { Form, useNavigate  } from "react-router-dom";
import { authenticateDoctor } from "../api";
import { useState } from "react";
import "../index.css";

export default function LoginDoctor() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[userId, setUserId] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(){
        authenticateDoctor(email, password)
        .then(() => {
            navigate(`/patient/1`);
        })
        .catch((error) => {
            console.error(error);
            navigate('/loginError');
        });
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