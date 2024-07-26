"use client";
import { useRenameProjectMutation } from "@/redux/features/project/project.api";
import { setProjectName } from "@/redux/features/project/project.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { debounce } from "lodash";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const CanvasHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { projectName, canvas } = useAppSelector((state) => state.project);
  let project_name = projectName;

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const [renameProject] = useRenameProjectMutation();
  const debouncedUpdate = useMemo(
    () =>
      debounce(async (id: string, projectName: string) => {
        if (!projectName) return;
        await renameProject({ id: id as string, projectName: projectName });
      }, 1000),
    [renameProject]
  );

  useEffect(() => {
    debouncedUpdate(id as string, projectName);

    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate, projectName, id]);

  return (
    <div className="h-[70px] w-full canvasHeadGradient shrink-0 px-[20px] flex items-center justify-between border-b-[1px] border-borderDark">
      <Link href={"/"} className="text-white center gap-[5px]">
        <ArrowLeftIcon /> Home
      </Link>

      <input
        value={projectName}
        onChange={(e) => dispatch(setProjectName(e.target.value))}
        className="border-[1px] border-transparent outline-none bg-transparent text-primaryTxt font-[400] text-[18px] focus:border-borderDark pl-[8px] rounded-[5px] py-[3px] line-clamp-2"
        spellCheck={false}
      />

      <Link
        href={"/profile"}
        className="avatarGradient center p-[5px] rounded-full"
      >
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            alt="profile"
            src={user?.image || "/images/avatar.jpg"}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default CanvasHeader;
