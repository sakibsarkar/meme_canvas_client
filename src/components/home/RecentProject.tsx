"use client";
import { useGetProjectsQuery } from "@/redux/features/project/project.api";
import ProjectCard from "../ProjectCard/ProjectCard";
import Loader from "../shared/Loader";
import NoDataFound from "../shared/NoDataFound";

const RecentProject = () => {
  const { data, isFetching } = useGetProjectsQuery(undefined);
  if (isFetching) {
    return <Loader />;
  }

  if (data?.data.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="flex flex-col justify-start items-start gap-[10px] mt-[20px] w-full mb-[20px]">
      <h2 className="text-primaryTxt font-[700] text-[35px]">
        Recent Projects
      </h2>
      <div className="gridResponsive gap-[20px] justify-center w-full">
        {data?.data.map((project) => (
          <ProjectCard data={project} key={project._id} />
        ))}
      </div>
    </div>
  );
};

export default RecentProject;
