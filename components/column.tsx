'use client';

import { Status, useTaskStore } from '@/lib/store';
import Task from './task';
import { useEffect, useMemo } from 'react';

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

  const filteredTasks = useMemo(() => currentSubjectTasks.filter(task => task.status === status), [currentSubjectTasks, status]);

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
    <section className='flex flex-col h-[400px] flex-grow-0 flex-shrink-0 basis-[300px]'>
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

          {filteredTasks.length === 0 && status === 'TODO' && (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Create a new task</p>
            </div>
          )}

          {currentSubjectTasks.length && filteredTasks.length === 0 && status !== 'TODO' ? (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
