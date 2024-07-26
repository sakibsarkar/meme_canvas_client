import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import DeletProjectAction from "./DeletProjectAction";
import EditProjectNameAction from "./EditProjectNameAction";

const ProjectCardAction = ({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) => {
  return (
    <div className="absolute bottom-4 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-[40px] h-[40px] center hover:bg-[#f0f0f0c0] rounded-[8px] bg-transparent border-none outline-none text-primaryTxt font-[600] text-[18px] cursor-pointer">
            <HiDotsHorizontal />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuGroup>
          <DropdownMenuContent className="cursor-pointer">
            <DropdownMenuItem asChild>
              <DeletProjectAction projectId={projectId} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditProjectNameAction
                projectId={projectId}
                defaultProjectName={projectName}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuGroup>
      </DropdownMenu>
    </div>
  );
};

export default ProjectCardAction;
