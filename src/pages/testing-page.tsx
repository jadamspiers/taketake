import React, {useEffect, useRef} from 'react';

export const TestingPage: React.FC = () => {

    const ws = useRef<WebSocket | null>(null);

    const connect = () => {
        ws.current = new WebSocket('ws://localhost:8080/ws');

        ws.current?.addEventListener('open', (event) => {
            console.log("connected to WS!")
        })
    };

    connect();

    return (
        <div>hi</div>
    )
}