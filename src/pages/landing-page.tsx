import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {

    const navigate = useNavigate();
    const { user, loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            prompt: "login",
            appState: {
                returnTo: "/play",
            },
        });
    };

    const handlePlayClick = () => {
        console.log("play was pressed")
        if (user) {
            console.log("logged in")
            navigate("/play")
        } else {
            console.log("not logged in")
            handleLogin()
        }
    }

    return (
        <div className="grid h-screen place-items-center">
            <button 
                className="h-12 w-24 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                onClick={handlePlayClick}
            >
                Play
            </button>
        </div>
    )
}