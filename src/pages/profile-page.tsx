import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        <div>
            <img
                src={user.picture}
                alt="Profile"
            />
            <h2>{user.name}</h2>
            <span>{user.email}</span>
            Decoded ID Token
            {JSON.stringify(user, null, 2)}
        </div>
    );
};
