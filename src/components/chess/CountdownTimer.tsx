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
    return (
        <div className="flex flex-col content-center">
            {days}:{hours}:{minutes}:{seconds}
        </div>
    );
};

export const CountdownTimer = ({ targetDate, set_is_time_expired }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice set_is_time_expired={set_is_time_expired}/>;
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
