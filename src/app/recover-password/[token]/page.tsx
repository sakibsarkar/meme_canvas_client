"use client";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/redux/api/appSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  password: "",
  confirmPassword: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  password: Yup.string().required("* Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "* Passwords must match")
    .required("* Confirm password is required"),
});

const RecoverPassword = () => {
  const { token } = useParams();

  const router = useRouter();

  const handleForgotPassword = async (values: TFormValues) => {
    const res = await fetch(`${baseUrl}/auth/recover-password`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: values.password }),
    });

    if (res.status === 401) {
      return toast.error(
        "Your password session is expire,please request again for forgot password"
      );
    }
    if (res.status === 404) {
      return toast.error("No account found on this email");
    }

    if (!res.ok) {
      return toast.error("something went wrong");
    }
    const data = await res.json();

    if (data?.success) {
      toast.success("password recovered", {
        description:
          "your password has been changed with new password. Please login",
      });
      router.replace("/login");
    }
  };

  return (
    <div className="h-screen w-full center">
      <div className="w-[90%] md:w-[750px] shadow-md flex flex-col gap-[10px] p-[20px] rounded-[15px]">
        <Link
          href={"/login"}
          className="flex items-center justify-start gap-[5px]"
        >
          <ArrowLeft />
          Go back to login
        </Link>
        <h1 className="text-[25px] text-primaryTxt font-[700]">
          Forgot password
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {() => (
            <Form className="mt-[20px]">
              <div className="mb-4">
                <label className="block text-primaryTxt text-[18px] font-[600]">
                  Password *
                </label>
                <Field type="password" name="password" as={Input} />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-primaryTxt text-[18px] font-[600]">
                  confirmPassword *
                </label>
                <Field type="password" name="confirmPassword" as={Input} />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full px-[15px] center gap-[8px] bg-primaryMat text-white py-[12px] hover:bg-green-600 rounded-[5px]"
              >
                Go ahead <ArrowRight />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RecoverPassword;
