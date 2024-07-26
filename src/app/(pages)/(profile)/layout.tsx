"use client";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      return router.push("/");
    }
  }, [token, router]);

  return (
    <div className="w-full min-h-screen flex items-start justify-center layout_container py-[50px]">
      <div className="min-h-[400px] overflow-auto flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[10px] shadow-md w-full">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
