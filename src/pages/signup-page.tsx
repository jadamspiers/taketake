
import { useState } from 'react';
import { Auth } from 'aws-amplify';

export const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SignUp = async () => {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                // attributes: {
                //     email,          // optional
                //     // other custom attributes 
                // },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div>Username:</div>
                <input onChange={(e) => setUsername(e.target.value)}/>
                <div>Password:</div>
                <input onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={SignUp}>
                    Sign Up
                </button>
            </div>
        </>
    )

}
