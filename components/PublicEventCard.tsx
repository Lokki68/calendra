import { formatEventDuration } from "@/lib/formatters";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type PublicEventCardProps = {
  id: string;
  name: string;
  clerkUserId: string;
  description: string | null;
  durationInMinutes: number;
};

export default function PublicEventCard({
  id,
  name,
  clerkUserId,
  description,
  durationInMinutes,
}: PublicEventCardProps) {
  return (
    <Card className="flex flex-col border-4 border-blue-500/10 shadow-2xl transition delay-150 duration-300">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDuration(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        <Button className="cursor-pointer bg-blue-400 hover:bg-blue-600">
          <Link href={`/book/${clerkUserId}/${id}`}>Select</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
