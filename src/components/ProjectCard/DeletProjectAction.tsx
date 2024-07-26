import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProjectMutation } from "@/redux/features/project/project.api";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const DeletProjectAction = ({ projectId }: { projectId: string }) => {
  const [deleteProject] = useDeleteProjectMutation();
  const handleDelete = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      await deleteProject(projectId);
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Something went wrong while deleting this project");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="items-center gap-[5px] flex px-[8px] py-[6px] w-full">
          <FaTrash className="text-red-400" />
          Delete project
        </button>
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-md rounded-lg p-6 shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this project?
          </DialogTitle>
          <DialogDescription>
            Once you delete your project there is no you to get back.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button>Dont delete</Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            className=" text-white hover:bg-[#585858] items-center flex gap-[5px]"
          >
            <FaTrash /> Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletProjectAction;
