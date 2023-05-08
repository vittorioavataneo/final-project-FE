import { Form, useNavigate  } from "react-router-dom";
import { authenticateDoctor, findPersonIdByUserEmail } from "../api";
import { useState } from "react";
import "../index.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginDoctor() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[userId, setUserId] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(){
        authenticateDoctor(email, password)
        .then(() => findPersonIdByUserEmail(email))
        .then((userId) => {
            setUserId(userId);
            navigate(`/doctor/${userId}/examinations`);
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
                                    Email <AiOutlineMail/>:
                                    <input type="email" value={email} onChange={changeEmail} />
                                </label>
                                <br/>
                                <label>
                                    Password <RiLockPasswordFill/>:
                                    <input type="password" value={password} onChange={changePassword} />
                                </label>
                                <br/>
                                <button type="submit">Conferma</button>
                            </Form>
            </div>
        </>
    )
}