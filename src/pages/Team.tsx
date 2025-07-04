
import { Users, Mail, Phone, MapPin, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      email: "sarah@company.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      avatar: "/placeholder.svg",
      status: "online",
      tasksCount: 12,
      completedTasks: 8
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Lead Developer",
      email: "mike@company.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg",
      status: "online",
      tasksCount: 15,
      completedTasks: 12
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      email: "emily@company.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      avatar: "/placeholder.svg",
      status: "away",
      tasksCount: 8,
      completedTasks: 6
    },
    {
      id: 4,
      name: "David Kim",
      role: "Frontend Developer",
      email: "david@company.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      avatar: "/placeholder.svg",
      status: "offline",
      tasksCount: 10,
      completedTasks: 7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'away':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team</h1>
          <p className="text-lg text-muted-foreground">Manage your team members and collaboration</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem>Assign Task</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {member.completedTasks}/{member.tasksCount} tasks
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(member.completedTasks / member.tasksCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
