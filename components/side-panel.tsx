"use client"
import { useTaskStore } from '@/lib/store';
import NewSubject from "./new-subject";
import NewTodoDialog from "./new-todo-dialog";

export default function SidePanel() {
    const subjects = useTaskStore(state => state.subjects);
    const selectSubject = useTaskStore(state => state.selectSubject);

    return (
        <aside className='w-[300px] bg-gray-800 p-4 rounded-lg'>
            <h2 className='text-2xl font-semibold text-white'>Task Manager</h2>
            <p className='mt-2 text-gray-400'>
                Manage your tasks and get things done
            </p>
            <div className="mt-4">
                <NewSubject />
            </div>
            <div className="mt-4">
                <h3 className='text-xl font-semibold text-white'>Subjects</h3>
                <ul className="mt-2">
                    {subjects.map(subject => (
                        <li key={subject.id} className="mt-2">
                            <button
                                className="text-left text-white hover:text-gray-200"
                                onClick={() => selectSubject(subject.id)}
                            >
                                {subject.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
