import { formatEventDuration } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CopyEventButton from "../CopyEventButton";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

export default function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col border-4 border-blue-500/10 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110",
        !isActive && "bg-accent border-accent"
      )}
    >
      <CardHeader className={cn(!isActive && "opacity-50")}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDuration(durationInMinutes)}
        </CardDescription>
      </CardHeader>

      {description != null && (
        <CardContent className={cn(!isActive && "opacity-50")}>
          {description}
        </CardContent>
      )}

      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}

        <Button className="cursor-pointer bg-blue-400 hover:bg-blue-600">
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
