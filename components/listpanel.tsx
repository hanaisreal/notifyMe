"use client"
import React from 'react';
import { useTaskStore, Subject, SessionNote } from '@/lib/store'; // Ensure all types are imported correctly

const ListPanel: React.FC = () => {
    const { currentSubjectId, currentTaskId, subjects } = useTaskStore(state => ({
        currentSubjectId: state.currentSubjectId,
        currentTaskId: state.currentTaskId,
        subjects: state.subjects as Subject[]
    }));

    // Helper function to render session notes with proper type
    const renderSessionNotes = (notes: SessionNote[]) => {
        return notes.map((note: SessionNote) => (
            <div key={note.id} className="p-2 mb-2 bg-gray-600 rounded">
                <p className="text-sm text-white">Date: {note.date}</p>
                <p className="text-sm text-white">Time Spent: {note.timeSpent} minutes</p>
                <p className="text-sm text-white">Note: {note.content}</p>
            </div>
        ));
    };

    let notesToDisplay: JSX.Element[] = []; // Changed to let for mutability
    const selectedSubject = subjects.find(subject => subject.id === currentSubjectId);

    if (selectedSubject) {
        if (currentTaskId) {
            const selectedTask = selectedSubject.tasks.find(task => task.id === currentTaskId);
            if (selectedTask?.sessionNotes) {
                notesToDisplay = renderSessionNotes(selectedTask.sessionNotes);
            }
        } else {
            selectedSubject.tasks.forEach(task => {
                if (task.sessionNotes) {
                    notesToDisplay = [...notesToDisplay, ...renderSessionNotes(task.sessionNotes)];
                }
            });
        }
    }

    return (
        <section className='w-5/6 h-[400px] overflow-auto'>
            <h2 className='ml-1 font-serif text-2xl font-semibold text-white'>Records</h2>
            <div className='mt-4 rounded-xl bg-gray-700/50 p-4 h-full'>
                {notesToDisplay.length > 0 ? notesToDisplay : <p className="text-white">No session notes available.</p>}
            </div>
        </section>
    );
};

export default ListPanel;
