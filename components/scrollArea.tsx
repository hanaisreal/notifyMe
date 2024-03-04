import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Subject } from "@/lib/store";

// Update Props type to include `subjects`
type Props = {
    subjects: Subject[];
    selectSubject: (id: string) => void; // Assuming you also pass selectSubject as a prop
  };
  export function ScrollAreaDemo({ subjects, selectSubject }: Props) {
    return (
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Subjects</h4>
          {subjects.map((subject) => (
            <React.Fragment key={subject.id}>
              <div className="text-sm">
                <button
                  className="text-left text-white bg-gray-700 rounded px-4 py-2 hover:text-gray-400 cursor-pointer w-full"
                  onClick={() => selectSubject(subject.id)}
                >
                  {subject.name}
                </button>
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    );
  }
