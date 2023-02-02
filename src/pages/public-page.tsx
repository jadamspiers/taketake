import React, { useEffect, useState } from 'react';
import { getPublicResource } from '../services/message.service';

export const PublicPage: React.FC = () => {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const { data, error } = await getPublicResource();

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
            <h1>Public Page</h1>
            <span>This page retrieves a <strong>public message</strong> from an external API.</span>
            <span>
                <strong>Any visitor can access this page.</strong>
            </span>
            Public Message:
            {message}
        </div>
    );
};