import { useCreateProjectMutation } from "@/redux/features/project/project.api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IPorps {
  children: React.ReactNode;
}
const initialValues = {
  projectName: "",
  width: "",
  height: "",
};
const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project Name is required"),
  width: Yup.number()
    .required("Width is required")
    .min(1, "Width must be greater than 0"),
  height: Yup.number()
    .required("Height is required")
    .min(1, "Height must be greater than 0"),
});

type TValues = typeof initialValues;
const CreateProject: React.FC<IPorps> = ({ children }) => {
  const router = useRouter();
  const [createProject] = useCreateProjectMutation();

  const handleCreateProject = async (values: TValues) => {
    const { height, width, projectName } = values;
    const closeBtn = document.getElementById("cancel") as HTMLElement;
    const payload = {
      canvas: {
        width: parseInt(width),
        height: parseInt(height),
      },
      projectName: projectName,
    };
    const toastId = toast.loading("Please wait...");
    try {
      closeBtn.click();
      const data = await createProject(payload);
      router.push(`/canvas/${data?.data?.data._id}`);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Enter the details for your new project.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateProject}
        >
          <Form className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
              <Label htmlFor="projectName">Project Name</Label>
              <Field
                name="projectName"
                as={Input}
                placeholder="My Awesome Project"
              />
              <ErrorMessage
                name="projectName"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
              <Label htmlFor="width">Canvas Width</Label>
              <Field name="width" as={Input} type="number" placeholder="1920" />
              <ErrorMessage
                name="width"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
              <Label htmlFor="height">Canvas Height</Label>
              <Field
                name="height"
                as={Input}
                type="number"
                placeholder="1080"
              />
              <ErrorMessage
                name="height"
                component="div"
                className="text-red-600"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  className="mr-auto text-white"
                  type="button"
                  id="cancel"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-primaryMat">
                Create Project
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
