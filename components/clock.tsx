import { useTaskStore } from '@/lib/store';
import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa';

const CountdownClock = () => {
    const [minutes, setMinutes] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [noteContent, setNoteContent] = useState('');

    const size = 120; // SVG size
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;



    useEffect(() => {
        setSecondsLeft(minutes * 60);
    }, [minutes]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft(secondsLeft => {
                    const updatedSeconds = secondsLeft - 1;
                    if (updatedSeconds <= 0) {
                        setIsActive(false);
                        setShowModal(true); // Show modal on countdown completion
                        clearInterval(timer);
                    }
                    return updatedSeconds;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isActive, secondsLeft]);

   // Start, stop, and reset timer functions
   const startTimer = () => setIsActive(true);
   const stopTimer = () => setIsActive(false);
   const resetTimer = () => {
       setIsActive(false);
       setSecondsLeft(minutes * 60);
       setShowModal(false); // Ensure modal is closed on reset
   };

   const handleSaveNote = () => {
       const currentTaskId = useTaskStore.getState().currentTaskId;
       if(currentTaskId) {
           useTaskStore.getState().addSessionNote({
               taskId: currentTaskId,
               timeSpent: minutes,
               date: new Date().toISOString(),
               content: noteContent
           });
       }

       // Reset note content and close modal
       setNoteContent('');
       setShowModal(false);
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
                <text
                    fill="white"
                    x="50%"
                    y="50%"
                    dy="0.3em" // Adjust this value as needed to vertically center the text
                    textAnchor="middle"
                    fontSize="16"
                >
                   {Math.floor(secondsLeft / 60)}:{('0' + secondsLeft % 60).slice(-2)}
                </text>
            </svg>
            
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

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg space-y-3">
                        <h3 className="text-lg font-semibold">Session Note</h3>
                        <textarea
                            className="w-full border rounded p-2"
                            placeholder="What did you accomplish?"
                            value={noteContent}
                            onChange={e => setNoteContent(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleSaveNote}>Save</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CountdownClock;
