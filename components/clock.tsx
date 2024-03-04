import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa';

const CountdownClock = ({ minutes = 1}) => {
    const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
    const [isActive, setIsActive] = useState(false);
    const size = 120; // SVG size
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const initialOffset = circumference;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive) {
            timer = setInterval(() => {
                setSecondsLeft(prevSeconds => {
                    if (prevSeconds <= 1) {
                        setIsActive(false);
                        clearInterval(timer);
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isActive]);

    const strokeDashoffset = (circumference - (secondsLeft / (minutes * 60)) * circumference) + initialOffset;

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(minutes * 60);
    };

    return (
        <div className='flex flex-col  bg-gray-600/50 bg-auto bg-center shadow-sm p-4 mt-4 rounded-lg items-center'>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background circle */}
                <circle
                    fill="none"
                    stroke="#4CAF50"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                {/* Foreground circle */}
                <circle
                    fill="none"
                    stroke="#eee"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
                {/* Countdown text */}
                <text
                    fill="white"
                    fontSize="16"
                    x="50%"
                    y="50%"
                    dy="8"
                    textAnchor="middle">
                    {Math.floor(secondsLeft / 60)}:{('0' + secondsLeft % 60).slice(-2)}
                </text>
            </svg>
            <div style={{ marginTop: '15px', textAlign: 'center' }} className='text-gray-300 space-x-4'>
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
