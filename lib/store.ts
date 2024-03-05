import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status,
  sessionNotes?: SessionNote[]
}

export type Subject = {
  id: string;
  name: string;
  tasks: Task[];
};

export type SessionNote = {
  id: string; // Unique identifier for the note
  taskId: string; // ID of the task related to the note, if you need to reference back
  timeSpent: number; // Time spent in the session, in minutes
  date: string; // Date of the session note
  content: string; // The content of the session note
};

export type State = {
  subjects: Subject[];
  currentSubjectId: string | null; 
  currentTaskId: string | null; 
  draggedTask: string | null
}


export type Actions = {
  addSubject: (name: string) => void;
  selectSubject: (id: string) => void;
  addTask: (title: string, status: Status, description?: string) => void;
  dragTask: (taskId: string | null) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, status: Status) => void;
  selectTask: (taskId: string | null) => void; // Action to select a task
  addSessionNote: (note: Omit<SessionNote, 'id'>) => void; // Action to add a session note
}

export const useTaskStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      subjects: [],
      currentSubjectId: null,
      currentTaskId: null, // Initialize the currentTaskId
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
      selectTask: (taskId) => set({ currentTaskId: taskId }),
      addSessionNote: ({ taskId, timeSpent, date, content }) => {
        set(state => {
          return {
            subjects: state.subjects.map(subject => {
              return {
                ...subject,
                tasks: subject.tasks.map(task => {
                  if (task.id === taskId) {
                    const newNote = { id: uuid(), taskId, timeSpent, date, content };
                    const updatedNotes = task.sessionNotes ? [...task.sessionNotes, newNote] : [newNote];
                    return { ...task, sessionNotes: updatedNotes };
                  }
                  return task;
                }),
              };
            }),
          };
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
