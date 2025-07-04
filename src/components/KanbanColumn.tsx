
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { Column, Task } from "./KanbanBoard";

interface KanbanColumnProps {
  column: Column;
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onAddTask: () => void;
}

const KanbanColumn = ({ column, onMoveTask, onDeleteTask, onAddTask }: KanbanColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData('text/plain');
    const { taskId, fromColumnId } = JSON.parse(taskData);
    
    if (fromColumnId !== column.id) {
      onMoveTask(taskId, fromColumnId, column.id);
    }
  };

  return (
    <Card className="w-80 flex-shrink-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{column.title}</CardTitle>
          <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">
            {column.tasks.length}
          </span>
        </div>
      </CardHeader>
      <CardContent 
        className="space-y-3 min-h-[200px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onDelete={() => onDeleteTask(task.id, column.id)}
          />
        ))}
        
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={onAddTask}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
