import React, { useEffect } from 'react';
import { useCountdown } from './useCountdown';

const ExpiredNotice = ({ set_is_time_expired }: any) => {
    useEffect(() => {
        set_is_time_expired(true);
    }, []);

    return (
      <div className="expired-notice">
        <span>Expired!!!</span>
        <p>Please select a future date and time.</p>
      </div>
    );
  };



const ShowCounter = ({ days, hours, minutes, seconds }: any) => {


    // example cases - only handle minutes and seconds for now
    // 5:23 (minute clock)
    // 3:00
    // 0:48
    let timeString = ""
    let dayString = ""
    let hrString = ""
    let minString = ""
    let secString = ""

    if (days + hours + minutes + seconds > 0) {
      if (seconds < 10) {
        secString = "0" + seconds
      }
      timeString = minutes + ":" + secString
    }

    return (
        <div className="flex flex-col content-center">
          {timeString}
        </div>
    );
};

export const CountdownString = ({ targetDate }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  let timeString = ""
  let secString = ""

  if (seconds < 10) {
    secString = "0" + seconds
  }
  timeString = minutes + ":" + secString

  return timeString
}

export const CountdownTimer = ({ targetDate, set_is_time_expired }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice set_is_time_expired={set_is_time_expired}/>
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
