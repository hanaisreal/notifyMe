import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa';

const CountdownClock = () => {
    const [minutes, setMinutes] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
    const [isActive, setIsActive] = useState(false);
    const size = 120; // SVG size
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;


    useEffect(() => {
        setSecondsLeft(minutes * 60);
    }, [minutes]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive) {
            timer = setInterval(() => {
                setSecondsLeft((prevSeconds) => {
                    const updatedSeconds = prevSeconds - 1;
                    if (updatedSeconds <= 0) {
                        setIsActive(false);
                    }
                    return updatedSeconds;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isActive]);

    useEffect(() => {
        setSecondsLeft(minutes * 60);
    }, [minutes]);

    const startTimer = () => {
        if (!isActive && secondsLeft > 0) {
            setIsActive(true);
        }
    };


    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(minutes * 60);
    };

    const strokeDashoffset = circumference - (circumference * (secondsLeft / (minutes * 60)));


    return (
        <div className='flex flex-col  bg-gray-600/50 bg-auto bg-center shadow-sm p-4 mt-4 rounded-lg items-center'>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background circle */}
                <circle
                    fill="none"
                    stroke="#eee"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                {/* Foreground circle */}
                <circle
                    fill="none"
                    stroke="#4CAF50"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
                {/* Countdown text */}
            </svg>
            <div className='absolute text-center mt-10 pt-2 ' >
                <span style={{ fontSize: '16px' }}>
                        {Math.floor(secondsLeft / 60)}:{('0' + secondsLeft % 60).slice(-2)}
                </span>
            </div>
            <div className='mt-2'>
                {isActive
                    ? <span>focus time</span>
                    :
                    <>
                        <input
                            className='rounded-lg bg-gray-400 text-center mr-2'
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(Math.max(1, Math.min(60, parseInt(e.target.value))))}
                            min="1"
                            max="60"
                            style={{ fontSize: '16px' }}
                        />
                        <span style={{ fontSize: '16px' }}>Minutes</span>
                    </>
                }
                
            </div>
            <div style={{ marginTop: '15px', textAlign: 'center' }} className='text-gray-300 space-x-6'>
                {isActive ? (
                    <button onClick={stopTimer} aria-label="Stop">
                        <FaStop />
                    </button>
                ) : (
                    <button onClick={startTimer} aria-label="Start">
                        <FaPlay />
                    </button>
                )}
                <button onClick={resetTimer} aria-label="Restart">
                    <FaRedo />
                </button>
            </div>

        </div>
    );
};

export default CountdownClock;
