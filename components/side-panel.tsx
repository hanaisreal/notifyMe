"use client"
import { useTaskStore } from '@/lib/store';
import NewSubject from "./new-subject";
import NewTodoDialog from "./new-task";
import CountdownClock from './clock';

export default function SidePanel() {
    const subjects = useTaskStore(state => state.subjects);
    const selectSubject = useTaskStore(state => state.selectSubject);

    return (
        <div className='flex flex-col h-full ' >
            <aside className='w-[250px] h-full bg-gray-800 p-4 rounded-lg flex flex-col '>
            <h2 className='text-2xl font-semibold text-white self-center'>Task Manager</h2>
            <div className="mt-4 self-center">
                <NewSubject />
            </div>
            <div className="mt-4 self-center">
                <ul className="mt-4 self-center">
                    {subjects.map(subject => (
                        <li key={subject.id} className="mt-2">
                            <button
                                className="text-left text-whitetext-left text-white bg-gray-700 rounded px-4 py-2 hover:text-gray-400 cursor-pointer w-48"
                                onClick={() => selectSubject(subject.id)}
                            >
                                {subject.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <hr className='absolute bottom-80 w-48  border-white/50 self-center' />

            <div className='absolute self-center pb-4 bottom-10 w-48'>
            <CountdownClock />
            </div>
        </aside>

        </div>
        
    );
}
