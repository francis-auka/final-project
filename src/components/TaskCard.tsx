
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Star } from "lucide-react";
import ProfileAvatar from "@/components/ProfileAvatar";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    offer: string;
    category: string;
    status: "open" | "in progress" | "finished";
    deadline: string;
    assigned_to?: string;
    user: {
      id: string;
      name: string;
      trustScore: number;
    };
    bids: number;
  };
  categories: { value: string; label: string }[];
  onChatClick: () => void;
  onBidClick: () => void;
  onViewBidsClick?: () => void;
  onFinishClick?: () => void;
  isOwner?: boolean;
  statusColors: Record<string, string>;
  actionButton?: React.ReactElement;
}

const TaskCard = ({ 
  task, 
  categories, 
  onChatClick, 
  onBidClick, 
  onViewBidsClick, 
  onFinishClick,
  isOwner = false,
  statusColors,
  actionButton
}: TaskCardProps) => {
  // Format the deadline to a more readable format
  const formattedDeadline = new Date(task.deadline).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const categoryLabel = categories.find(c => c.value === task.category)?.label || task.category;

  return (
    <Card className="h-full flex flex-col hover:shadow-elevated transition-all duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className={`${statusColors[task.status]} text-xs font-medium px-2 py-1`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-muted/50 text-muted-foreground text-xs font-medium px-2 py-1">
            {categoryLabel}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold leading-tight text-foreground mb-3">{task.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <ProfileAvatar 
              name={task.user.name} 
              size="sm" 
              profilePicUrl={null} 
            />
            <span className="ml-2 font-medium">Posted by {task.user.name}</span>
          </div>
          <span className="flex items-center ml-3">
            {renderStars(task.user.trustScore)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-0 flex-grow">
        <div className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">{task.description}</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>Due: {formattedDeadline}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-1.5" />
            <span>{task.bids} {task.bids === 1 ? 'bid' : 'bids'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t border-border">
        <div className="font-semibold text-lg text-foreground">{task.offer}</div>
        <div className="flex space-x-2">
          {actionButton}
          {isOwner ? (
            <>
              {task.status === "open" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewBidsClick}
                  className="font-medium"
                >
                  View Bids
                </Button>
              )}
              {task.status === "in progress" && (
                <Button
                  size="sm"
                  onClick={onFinishClick}
                  className="font-medium"
                >
                  Mark Complete
                </Button>
              )}
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                size="sm"
                onClick={onChatClick}
                disabled={task.status !== "open"}
                className="font-medium"
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                Chat
              </Button>
              <Button 
                size="sm"
                onClick={onBidClick}
                disabled={task.status !== "open"}
                className="font-medium"
              >
                {task.status === "open" ? "Place Bid" : "Closed"}
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const renderStars = (score: number) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.floor(score)
              ? "text-yellow-500 fill-yellow-500"
              : i < score
              ? "text-yellow-500 fill-yellow-500 opacity-50"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
};

export default TaskCard;
