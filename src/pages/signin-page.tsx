import { exec } from "child_process";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SignInForm from "./page_components/signin-form";

export function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const executeSignIn = async (event: any) => {
        event.preventDefault();
        const result = await auth.signIn(email, password);
        if (result.success) {
            navigate({ pathname: "/play" });
        } else {
            alert(result.message);
        }
    };

    return (
        <>
            <SignInForm setEmail={setEmail} setPassword={setPassword} executeSignIn={executeSignIn}/>
            {/* <div>Email: </div>
            <input
                placeholder="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>Password: </div>
            <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={executeSignIn}>
                Login
            </button> */}
        </>
    );
}