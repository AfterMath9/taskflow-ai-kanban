
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, User } from "lucide-react";
import { Task } from "./KanbanBoard";

interface TaskCardProps {
  task: Task;
  columnId: string;
  onDelete: () => void;
}

const TaskCard = ({ task, columnId, onDelete }: TaskCardProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    const taskData = JSON.stringify({
      taskId: task.id,
      fromColumnId: columnId
    });
    e.dataTransfer.setData('text/plain', taskData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      className="cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={handleDragStart}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
          
          {task.assignee && (
            <div className="flex items-center text-xs text-muted-foreground">
              <User className="h-3 w-3 mr-1" />
              <span className="truncate max-w-16">{task.assignee}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
