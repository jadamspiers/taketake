import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const CallbackPage: React.FC = () => {
    const { error } = useAuth0();

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                {error.message}
            </div>
        );
    }

   return (
        <div>
            Callback page
        </div>
    );
};
