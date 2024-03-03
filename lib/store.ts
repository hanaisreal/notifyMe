import {create} from 'zustand';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: Status
    };

export type State = {
    tasks: Task[]
}

export type Actions = {
    addTask: (title: string, description: string) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, status: Status) => void;


}
export const useTaskStore = create<State & Actions>((set) => ({
    tasks: [],
    addTask: (title: string, description?: string) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    id: '1',
                    title,
                    description,
                    status: 'TODO'
                }
            ]
        })),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
    })),
    updateTask: (id, status) => set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task))
    }))
}));
