
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { API } from 'aws-amplify';

export const MatchmakingPage = () => {
    const auth = useAuth();

    /**
     * 1. Start matchmaking
     * 2. Describe matchmaking
     * 3. Stop matchmaking
     */
}