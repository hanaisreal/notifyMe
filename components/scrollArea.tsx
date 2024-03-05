import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Subject, useTaskStore } from "@/lib/TaskStore"; // Adjust the path as necessary


// Update Props type to include `subjects`
type Props = {
    subjects: Subject[];
    selectSubject: (id: string) => void; // Assuming you also pass selectSubject as a prop
  };
  export function ScrollAreaDemo({ subjects, selectSubject }: Props) {
    const removeSubject = useTaskStore((state) => state.removeSubject);

    return (
      <ScrollArea className="h-72 w-60 rounded-md bg-gray-800 ">
          <div className="p-5">
              <h4 className="mb-4 text-lg font-medium leading-none font-serif text-white">Subjects</h4>
              {subjects.map((subject) => (
                  <React.Fragment key={subject.id}>
                      <div className="flex items-center justify-between text-sm mb-2">
                          <button
                            className="text-left text-white bg-gray-700 rounded-lg px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => selectSubject(subject.id)}
                          >
                              {subject.name}
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-400 text-white rounded-lg p-2"
                            onClick={() => removeSubject(subject.id)}
                          >
                              &times; {/* Multiplication sign as a delete icon, consider using an SVG or icon library */}
                          </button>
                      </div>
                      
                  </React.Fragment>
              ))}
          </div>
      </ScrollArea>
  );
}