import { useTaskStore } from '@/lib/store';
import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa';
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from './ui/textarea'

const CountdownClock = () => {
    const [minutes, setMinutes] = useState(1);
    const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
    const [showDialog, setShowDialog] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const addSessionNote = useTaskStore(state => state.addSessionNote); 
    const { subjects, currentSubjectId } = useTaskStore(state => ({
        subjects: state.subjects,
        currentSubjectId: state.currentSubjectId
    }));

    const [selectedTaskId, setSelectedTaskId] = useState('');
    const tasks = subjects.find(subject => subject.id === currentSubjectId)?.tasks || [];


    useEffect(() => {
        // Optionally reset selected task when dialog is shown or subject changes
        if (tasks.length) setSelectedTaskId(tasks[0].id);
    }, [showDialog, tasks]);


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
                setSecondsLeft(secondsLeft - 1);
                if (secondsLeft <= 1) {
                    setIsActive(false);
                    setShowDialog(true); // Open the dialog when the countdown finishes
                }
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
   };

   const handleSaveNote = () => {
    if(selectedTaskId) {
        addSessionNote({
            taskId: selectedTaskId,
            timeSpent: minutes,
            date: new Date().toISOString(),
            content: noteContent
        });
    }

    // Reset note content and close modal
    setNoteContent('');
    setShowDialog(false);
    setSelectedTaskId('');
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
            <div>
            {/* Existing component content */}
            {showDialog && (
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Record</DialogTitle>
                            <DialogDescription>Add a new session note for your task</DialogDescription>
                        </DialogHeader>
                        <select
                            value={selectedTaskId}
                            onChange={e => setSelectedTaskId(e.target.value)}
                            className="mb-4 p-2 rounded border border-gray-300">
                            {tasks.map(task => (
                                <option key={task.id} value={task.id}>{task.title}</option>
                            ))}
                        </select>
                        <Textarea
                            placeholder="What did you accomplish?"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                        />
                        <DialogFooter>
                            <Button onClick={handleSaveNote}>Save Note</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
        
        </div>
    );
};


export default CountdownClock;
