"use client";
import { Button } from "../ui/button";

const NoDataFound = () => {
  const handleCreateProject = () => {
    const createButton = document.getElementById("create") as HTMLElement;
    createButton.click();
  };

  return (
    <div className="w-full py-[40px] center flex-col gap-[5px] min-h-[50vh]">
      <div className="mx-auto max-w-md text-center">
        {/* <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" /> */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You dont have any project to start.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Lets create a new project to display here!
        </p>
        <div className="mt-6">
          <Button onClick={handleCreateProject} variant={"outline"}>
            Create a new project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
