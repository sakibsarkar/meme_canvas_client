"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hook";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  oldPassword: "",
  password: "",
};
type FormValues = typeof initialValues;
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("* Old password is required"),
  password: Yup.string()
    .min(6, "Password should atleast 6 character")
    .notOneOf(
      [Yup.ref("oldPassword"), undefined],
      "* Your new password shouldn't match with old password"
    )
    .required("* New password is required"),
});

const UpdatePassword = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  // mutaions
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (values: FormValues) => {
    const toastId = toast.loading("Please wait");

    try {
      const data = await resetPassword(values);
      const error: any = data.error;

      console.log(error);

      if (error) {
        if (error.status === 403) {
          return toast.error("password didn;t matched", {
            description: "try to remember your password and try again",
          });
        }

        return toast.error(error.data?.message || "Unknown error occureds");
      }

      toast.success("Passworrd updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating your details");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-[600] mb-[20px]">
        Update your login credentials
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid }) => (
          <Form>
            <div className="mb-4">
              <Label htmlFor="oldPassword">Current password *</Label>
              <Field
                as={Input}
                placeholder="Type your current password"
                type="password"
                name="oldPassword"
                className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="text-red-500 text-sm mt-[5px]"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">New password *</Label>
              <Field
                type="password"
                as={Input}
                placeholder="Type your new password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-[5px]"
              />
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="bg-primaryMat text-white w-[100px]"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;
