import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type Subject = {
  id: string;
  name: string;
  tasks: Task[];
};

export type State = {
  subjects: Subject[];
  currentSubjectId: string | null; 
  draggedTask: string | null
}

export type Actions = {
  addSubject: (name: string) => void;
  selectSubject: (id: string) => void;
  addTask: (title: string, status: Status, description?: string) => void;
  dragTask: (taskId: string | null) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, status: Status) => void;
}

export const useTaskStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      subjects: [],
      currentSubjectId: null,
      draggedTask: null,
      addSubject: name =>
        set(state => ({
          subjects: [...state.subjects, { id: uuid(), name, tasks: [] }]
        })),
      selectSubject: id => set({ currentSubjectId: id }),
      addTask: (title, status, description = '') => {
        const { currentSubjectId, subjects } = get();
        if (!currentSubjectId) return;

        set(state => ({
          subjects: state.subjects.map(subject =>
            subject.id === currentSubjectId
              ? {
                  ...subject,
                  tasks: [...subject.tasks, { id: uuid(), title, description, status: status }],
                }
              : subject
          ),
        }));
      },
      dragTask: taskId => set({ draggedTask: taskId }),
      removeTask: taskId => {
        const { subjects, currentSubjectId } = get();
        if (!currentSubjectId) return;

        set({
          subjects: subjects.map(subject =>
            subject.id === currentSubjectId
              ? { ...subject, tasks: subject.tasks.filter(task => task.id !== taskId) }
              : subject
          ),
        });
      },
      updateTask: (taskId, status) => {
        const { subjects, currentSubjectId } = get();
        if (!currentSubjectId) return;

        set({
          subjects: subjects.map(subject =>
            subject.id === currentSubjectId
              ? {
                  ...subject,
                  tasks: subject.tasks.map(task =>
                    task.id === taskId ? { ...task, status } : task
                  ),
                }
              : subject
          ),
        });
      },
    }),
    { name: 'task-store', skipHydration: true }
  )
);
