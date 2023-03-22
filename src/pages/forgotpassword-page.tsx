import { exec } from "child_process";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ForgotPasswordForm from "./page_components/forgotpassword-form";
import SignInForm from "./page_components/signin-form";

export function ForgotPassword() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [new_password, setNewPassword] = useState("");


    const executeForgotPassword = async (event: any) => {
        event.preventDefault()
        const result = await auth.forgotPassword(username);
        if (result.success) {
            // do nothing
        } else {
            alert(result.message);
        }
    };

    const exeucteForgotPasswordSubmit = async (event: any) => {
        event.preventDefault();
        const result = await auth.forgotPasswordSubmit(username, code, new_password);
        if (result.success) {
            navigate({ pathname: "/play"})
        } else {
            alert(result.message);
        }
    }

    return (
        <>
            <ForgotPasswordForm 
                setUsername={setUsername}
                setCode={setCode}
                setNewPassword={setNewPassword}
                executeForgotPassword={executeForgotPassword} 
                exeucteForgotPasswordSubmit={exeucteForgotPasswordSubmit}
            />
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