
import KanbanBoard from "@/components/KanbanBoard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">TaskFlow AI Kanban</h1>
          <p className="text-xl text-muted-foreground">Organize your tasks with AI-powered workflow management</p>
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Index;
