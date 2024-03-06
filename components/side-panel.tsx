"use client"
import { useTaskStore } from '@/lib/TaskStore';
import NewSubject from "./new-subject";
import NewTodoDialog from "./new-task";
import CountdownClock from './clock';
import { ScrollAreaDemo } from './scrollArea';

export default function SidePanel() {
    const subjects = useTaskStore(state => state.subjects);
    const selectSubject = useTaskStore(state => state.selectSubject);

    return (
        <div className='flex flex-col h-full w-[250px]' >
            <aside className=' bg-gray-800 p-4 rounded-lg flex flex-col '>
            <h2 className='text-2xl font-semibold font-serif text-white self-center'>Notify Me</h2>
            <div className="mt-6 self-center">
                <NewSubject />
            </div>
            <div className="mt-4 self-center">
                <ul className="mt-4 self-center">
                    <ScrollAreaDemo subjects={subjects} selectSubject={selectSubject} />
                </ul>
            </div>

            <div className=' self-center pb-4 bottom-10 w-48'>
            <CountdownClock />
            </div>
        </aside>

        </div>
        
    );
}
