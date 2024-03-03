import NewTodoDialog from "./new-todo-dialog";

export default function SidePanel() {
    return (
        <aside className='w-[300px] bg-gray-800 p-4 rounded-lg'>
        <h2 className='text-2xl font-semibold text-white'>Task Manager</h2>
        <p className='mt-2 text-gray-400'>
            Manage your tasks and get things done
        </p>

        <div>
        < NewTodoDialog/>
        </div>
        </aside>
    )
    }