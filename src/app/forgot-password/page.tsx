"use client";
import { Input } from "@/components/ui/input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import CheckEmail from "./CheckEmail";
import { baseUrl } from "@/redux/api/appSlice";

const initialValues = {
  email: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
});

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);

  const handleForgotPassword = async (values: TFormValues) => {
    console.log(values);

 

    try {
      const res = await fetch(`${baseUrl}/auth/forgot-password`, {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 404) {
        return toast.error("No account found on this email");
      }

      if (!res.ok) {
        return toast.error("something went wrong");
      }
      const data = await res.json();

      if (data?.success) {
        setIsSent(true);
      }
    } catch (error) {}
  };
  return (
    <div className="h-screen w-full center">
      {isSent ? (
        <CheckEmail setIsSent={setIsSent} />
      ) : (
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
                    Email
                  </label>
                  <Field type="email" name="email" as={Input} />
                  <ErrorMessage
                    name="email"
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
      )}{" "}
    </div>
  );
};

export default ForgotPassword;
