import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { SignUpPage } from './signup-page';
import { useAuth } from '../hooks/useAuth';

export const LandingPage: React.FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const handlePlay = (event: any) => {
        event.preventDefault();
        // if the user is authenticated, then take them to the '/play'
        // if the not then take them to login page
        if (auth.isAuthenticated) {
            navigate({ pathname: "/play" });
        } else {
            navigate({ pathname: "/signin"})
        }
    }

    return (
        <>
            <div>TAKETAKE</div>
            <button onClick={handlePlay}>
                Play
            </button>
        </>
    )
}