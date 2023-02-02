import React, { useEffect, useState } from 'react';
import { getAdminResource } from '../services/message.service';

export const AdminPage: React.FC = () => {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const { data, error } = await getAdminResource();

            if (!isMounted) {
                return;
            }


            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <span>This page retrieves an <strong>admin message</strong> from an external API.</span>
            <span>
                <strong>Only authenticated users with the 'read:admin-messages' permission should access this page.</strong>
            </span>
            Admin Message:
            {message}
        </div>
    );
};