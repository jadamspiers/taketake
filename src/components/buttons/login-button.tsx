import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const LoginButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            prompt: "login",
            appState: {
                returnTo: "/",
            },
        });
    };

    return (
        <button className="p-2" onClick={handleLogin}>
            Log In
        </button>
    )
}