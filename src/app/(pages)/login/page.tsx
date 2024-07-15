"use client";

import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/auth.slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
});

const Login = () => {
  const [login] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await login(values);
      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }

      const authData = {
        user: data.data,
      };
      dispatch(setUser(authData));
      Cookies.set("refreshToken", data.refreshToken);
      Cookies.set("accessToken", data.accessToken);

      toast.success("Successfully logged in", {
        description: "Welcome back!",
      });

      const redirect = Cookies.get("redirect");
      router.push(redirect || "/profile");
      Cookies.remove("redirect");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[15px]">
      <div className="flex items-center justify-center gap-[50px]">
        <div className="w-[500px] h-[450px] overflow-hidden rounded-[15px]">
          <Image
            src={"/images/authLady.png"}
            alt="auth"
            width={300}
            className="w-full h-full object-cover"
            height={350}
          />
        </div>
        <div className="bg-white max-w-[450px]">
          <h2 className="font-bold mb-6 text-left text-[35px]">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-primaryTxt text-[18px] font-[600]">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-primaryTxt text-[18px] font-[600]">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-fit px-[15px] center gap-[8px] bg-primaryMat text-white py-[12px] hover:bg-green-600 rounded-[5px]"
                >
                  Login <LogIn />
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-6 text-start">
            <p className="text-gray-700">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primaryMat">
                Create Account
              </Link>
            </p>
          </div>

          <p className="mt-4 text-gray-600 text-sm text-start">
            Note: Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
