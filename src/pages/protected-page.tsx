import React, { useEffect, useState } from 'react';
import { getProtectedResource } from '../services/message.service';

export const ProtectedPage: React.FC = () => {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const { data, error } = await getProtectedResource();

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
            <h1>Protected Page</h1>
            <span>This page retrieves a <strong>protected message</strong> from an external API.</span>
            <span>
                <strong>Only authenticated users can access this page.</strong>
            </span>
            Protected Message:
            {message}
        </div>
    );
};