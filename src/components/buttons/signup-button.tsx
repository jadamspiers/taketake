import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const SignupButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    const handleSignUp = async () => {
        await loginWithRedirect({
            prompt: "login",
            appState: {
                returnTo: "/",
            },
            screen_hint: "signup",
        });
    };

    return (
        <button className="p-2" onClick={handleSignUp}>
            Sign Up
        </button>
    )
}