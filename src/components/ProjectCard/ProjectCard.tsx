import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IProjects } from "@/types/project";
import { trimText } from "@/utils/trimText";
import { formatDistanceToNow } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import Link from "next/link";
import ProjectCardAction from "./ProjectCardAction";

const ProjectCard = ({ data }: { data: IProjects }) => {
  const createdAt = new Date(data.createdAt || "22-12-2024");
  const updatedAt = new Date(data.updatedAt || "22-12-2024");

  return (
    <Card className="relative w-full">
      <ProjectCardAction projectId={data._id} projectName={data.projectName} />
      <Link href={`/canvas/${data._id}`} className="w-full">
        <CardContent className="px-[10px] pt-[10px]">
          <div className="w-full bg-slate-100 h-[150px]"></div>

          <CardTitle className="text-[16px] mt-[20px]">
            {trimText(data.projectName, 25) || "Untitle project"}
          </CardTitle>
          <div className="flex flex-col gap-[3px] mt-[10px]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>
                <span className="font-[600]">Created</span>{" "}
                {formatDistanceToNow(createdAt, { addSuffix: false })} ago
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>
                <span className="font-[600]">Updated</span>{" "}
                {formatDistanceToNow(updatedAt, { addSuffix: false })} ago
              </span>
            </div>
          </div>
        </CardContent>
      </Link>{" "}
    </Card>
  );
};
export default ProjectCard;
