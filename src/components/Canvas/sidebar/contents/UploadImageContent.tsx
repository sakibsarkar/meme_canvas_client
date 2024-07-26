import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetImagesQuery,
  useUploadImageMutation,
} from "@/redux/features/project/project.api";
import { addShape } from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const url = process.env.NEXT_PUBLIC_API_URL as string;

const UploadImageContent = () => {
  const { shapes } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();

  const [uploadImage] = useUploadImageMutation();
  const { data } = useGetImagesQuery(undefined);

  const token = Cookies.get("accessToken");
  const handleImageUpload = async (
    e?: React.ChangeEvent<HTMLInputElement> | "",
    url?: string
  ) => {
    if (url) {
      const newShape: IShape = {
        x: 200,
        y: 200,
        width: 100,
        height: 100,
        color: "",
        radius: 0,
        zIndex: shapes.length,
        id: uuidv4(),
        type: "image",
        rotation: 0,
        imageUrl: url,
      };
      dispatch(addShape(newShape));

      return;
    }

    const file = (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Pleas wait uploading your image");

    try {
      const { data } = await uploadImage(formData);

      const newShape: IShape = {
        x: 200,
        y: 200,
        width: 100,
        height: 100,
        color: "",
        radius: 0,
        zIndex: shapes.length,
        id: uuidv4(),
        type: "image",
        rotation: 0,
        imageUrl: data?.data || "",
      };
      dispatch(addShape(newShape));
    } catch (error) {
      toast.error("something went wrong while uploading this image");
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <div className="flex flex-col items-center justify-start w-full h-full px-[10px] gap-[20px]">
      <div className="flex flex-col items-center justify-center gap-4 text-center w-full">
        <Input
          type="file"
          className="invisible"
          id="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Label
          className=" py-2 text-lg text-[#cbcbcb] bg-[#5c2ed2] w-full rounded-[8px] cursor-pointer"
          htmlFor="file"
        >
          Choose File
        </Label>
      </div>
      <div className="flex flex-col gap-[10px] w-full">
        <h3 className="text-[25px] font-[700] text-[#e1e1e1]">
          Your recent images
        </h3>
        <div className="flex items-center justify-start flex-wrap gap-[10px] w-full">
          {data?.data.map(({ url }, i) => (
            <Image
              key={i + "image"}
              className="w-[auto] h-[140px] cursor-pointer"
              width={350}
              height={150}
              src={url}
              alt="images"
              onClick={() => handleImageUpload("", url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImageContent;
