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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRenameProjectMutation } from "@/redux/features/project/project.api";

import { useFormik } from "formik";
import { FaPen } from "react-icons/fa";
import { toast } from "sonner";
import * as Yup from "yup";

type TFormValues = {
  projectName: string;
};

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Name is required"),
});

const EditProjectNameAction = ({
  projectId,
  defaultProjectName,
}: {
  projectId: string;
  defaultProjectName: string;
}) => {
  const [renameProject] = useRenameProjectMutation();

  const handleSubmit = async (value: TFormValues) => {
    const newName = value.projectName.trim();
    const closeBtn = document.getElementById("edit-modal-close") as HTMLElement;
    if (newName === defaultProjectName) return closeBtn.click();

    const toastId = toast.loading("Please wait...");
    try {
      await renameProject({ id: projectId, projectName: newName });
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Something went wrong while renaming  this project");
    } finally {
      closeBtn.click();
      toast.dismiss(toastId);
    }
  };

  const formik = useFormik({
    initialValues: {
      projectName: defaultProjectName,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="items-center gap-[5px] flex px-[8px] py-[6px]">
          <FaPen />
          Edit Project name
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details for this product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="projectName">project Name</Label>
              <Input
                id="projectName"
                onBlur={formik.handleBlur}
                name="projectName"
                onChange={formik.handleChange}
                value={formik.values.projectName}
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div className="text-red-500">{formik.errors.projectName}</div>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!formik.isValid}>
              Save
            </Button>
            <DialogClose asChild>
              <Button variant="outline" id="edit-modal-close">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditProjectNameAction;
