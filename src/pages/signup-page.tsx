
import { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './page_components/signup-form';

export const SignUpPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const executeSignUp = async (event: any) => {
        event.preventDefault();
        const result = await auth.signUp(email, password);
        if (result.success) {
            console.log("successful sign up")
        } else {
            console.log("result: " + JSON.stringify(result));
        }
    }

    const executeConfirmSignUp = async (event: any) => {
        event.preventDefault();
        const result = await auth.confirmSignUp(email, code);
        if (result.success) {
            console.log("successful confirming sign up")
            navigate({ pathname: "/play" });
        } else {
            console.log("failed confirming sign up")
        }
    }

    return (
        <>
            <SignUpForm 
                setEmail={setEmail} 
                setPassword={setPassword} 
                executeSignUp={executeSignUp}
                executeConfirmSignUp={executeConfirmSignUp}
                setCode={setCode}
            />
            {/* <div className="flex flex-col">
                <div>Username:</div>
                <input onChange={(e) => setUsername(e.target.value)}/>
                <div>Password:</div>
                <input onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={executeSignUp}>
                    Sign Up
                </button>
                <div>Code:</div>
                <input onChange={(e) => setCode(e.target.value)}/>
                <button onClick={executeConfirmSignUp}>
                    Confirm Code
                </button>
            </div> */}
        </>
    )

}
