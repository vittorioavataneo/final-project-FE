import { Form, useNavigate  } from "react-router-dom";
import { authenticatePatient, findPersonIdByUserEmail } from "../api";
import { useState } from "react";
import "../index.css";

export default function LoginPatient() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[userId, setUserId] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(){
        authenticatePatient(email, password)
        .then(() => findPersonIdByUserEmail(email))
        .then((userId) => {
            setUserId(userId);
            navigate(`/patient/${userId}`);
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
                                </label><br/>
                                <label>
                                    Password:
                                    <input type="text" value={password} onChange={changePassword} />
                                </label><br/>
                                <button type="submit">Conferma</button>
                            </Form>
                            
            </div>
        </>
    )
}