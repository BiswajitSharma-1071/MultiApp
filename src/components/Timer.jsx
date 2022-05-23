import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ seconds }) => {
  const [minutes, setMinutes] = useState(0);
  const [sec, setSec] = useState(seconds);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (sec > 0) {
        setSec((prevSec) => prevSec - 1);
      }

      if (sec === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes((prevMinute) => prevMinute - 1);
          setSec(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='timer-text'>
      {minutes === 0 && sec === 0 ? "Refreshing" : `${sec} sec`}
    </div>
  );
};

Timer.propTypes = {
  seconds: PropTypes.number,
};

export default Timer;
