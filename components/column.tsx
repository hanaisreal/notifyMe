'use client';

import { Status, useTaskStore } from '@/lib/TaskStore';
import Task from './task';
import { useEffect, useMemo } from 'react';
import NewTask from './new-task';

export default function Column({
  title,
  status
}: {
  title: string,
  status: Status
}) {
  // Fetch the currently selected subject and its tasks
  const currentSubjectTasks = useTaskStore(state => {
    const currentSubject = state.subjects.find(subject => subject.id === state.currentSubjectId);
    return currentSubject ? currentSubject.tasks : [];
  });

  const filteredTasks = useMemo(() => 
    currentSubjectTasks.filter(task => 
      task.status === status), 
  [currentSubjectTasks, status]);

  const updateTask = useTaskStore(state => state.updateTask);
  const dragTask = useTaskStore(state => state.dragTask);
  const draggedTask = useTaskStore(state => state.draggedTask);

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };

  return (
    <section className='flex flex-col h-[400px] flex-grow-0 flex-shrink-0 basis-[250px]'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div
        className='flex-1 mt-4 w-full rounded-xl bg-gray-700/50 p-4 overflow-auto'
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}
        </div>

        <div className='text-sm text-gray-500 inset-x-0 bottom-0 h-16 w-16 ' >
        <NewTask title='Create a new task' status={status}/>
      </div>
      </div>
    </section>
  );
}
