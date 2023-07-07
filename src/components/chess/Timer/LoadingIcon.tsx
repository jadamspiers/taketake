import { useCallback, useEffect, useState } from "react";
import './LoadingIcon.css';

export const LoadingIcon = ({time, state_turn, myColor, set_time_expired}: any) => {

    const FULL_DASH_ARRAY = 283;
    const [seconds, setSeconds] = useState(time);
    // const [timeString, setTimeString] = useState("");
    const [isActive, setIsActive] = useState(false); // should set this to false as default, then toggle by external trigger

    useEffect(() => {
        console.log("myColor(): " + myColor)
        if (myColor !== undefined) {
            if (state_turn === "w" && myColor === "white") {
                console.log("MY TURN");
                toggleOn();
            } else if (state_turn === "w" && myColor === "black") {
                console.log("YOUR TURN");
                toggleOff();
            } else if (state_turn === "b" && myColor === "black") {
                console.log("MY TURN");
                toggleOn();
            } else if (state_turn === "b" && myColor === "white") {
                console.log("YOUR TURN");
                toggleOff();
            }
        }

    }, [state_turn, myColor])

    useEffect(() => {
        if (myColor !== undefined) {
            setSeconds(time);
        }
    }, [myColor, time]);

    function toggleOn() {
        setIsActive(true);
    }

    function toggleOff() {
        setIsActive(false);
    }

    // function reset() {
    //     setSeconds(0);
    //     setIsActive(false);
    // }

    // Divides time left by the defined time limit.
    const calculateTimeFraction = useCallback(() => {
        const rawTimeFraction = seconds / time;
        return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
    }, [seconds, time]);

    // Update the dasharray value as time passes, starting with 283
    const setCircleDasharray = useCallback(() => {
        const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
        document.getElementById("base-timer-path-remaining")?.setAttribute("stroke-dasharray", circleDasharray);
    }, [calculateTimeFraction]);

    function formatTimeLeft (timeLeft: any) {
        let secString = "";
        let timeString = "";

        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        secString = seconds.toString();

        if (seconds < 10) {
            secString = "0" + seconds;
        }

        timeString = minutes + ":" + secString;

        return timeString;
    }

    useEffect(() => {
        let interval: any;
        if (isActive) {
            if (seconds !== 0) {
                interval = setInterval(() => {
                    setSeconds((seconds: any) => seconds - 1);
                    setCircleDasharray();
                }, 1000);
            } else {
                set_time_expired(true);
                clearInterval(interval);
            }

        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);

    }, [isActive, seconds, setCircleDasharray, set_time_expired]);

    return (
        <div className="relative h-48 w-48">
            <svg
                className="base-timer__svg"
                viewBox="0 0 100 100"
                xmlns="<http://www.w3.org/2000/svg>"
                >
                    <g className="fill-none stroke-none">
                        <circle cx="50" cy="50" r="45" strokeWidth="7px" stroke="grey"/>
                        <path
                            id="base-timer-path-remaining"
                            strokeDasharray="283"
                            className="base-timer__path-remaining"
                            d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0
                            "
                        />
                    </g>
            </svg>
            <span className="absolute w-48 h-48 top-0 flex center items-center justify-center text-5xl">
                {formatTimeLeft(seconds)}
            </span>
        </div>

    )
}