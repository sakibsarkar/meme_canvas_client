import CanvasHeader from "@/components/shared/CanvasHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <CanvasHeader />
      {children}
    </div>
  );
};

export default layout;
