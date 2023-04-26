import { Form } from "react-router-dom";
import "../index.css";

export default function Login() {
    return (
        <>
            <div id="login">
                            <Form>
                                <label>
                                    Email:
                                    <input type="text" name="email" />
                                </label>
                                <label>
                                    Password:
                                    <input type="text" name="password" />
                                </label>
                                <input type="submit" value="Accedi" />
                            </Form>
                        </div>
        </>
    )
}