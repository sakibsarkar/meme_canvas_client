"use client";
import { Button } from "@/components/ui/button";
import { setScale, setZoomScale } from "@/redux/features/project/project.slice";
import { setSelectedShape } from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toPng } from "html-to-image";
import React from "react";
import { MdDownload } from "react-icons/md";

const DownloadButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const { canvas, isExtended, projectName, zoom } = useAppSelector(
    (state) => state.project
  );
  const { shapes } = useAppSelector((state) => state.shapes);
  const oldZoom = zoom;

  const downloadImage = async () => {
    dispatch(setSelectedShape(null));
    const canvasDiv = document.getElementById("canvas");
    const canvasContainer = document.getElementById("canvas-container");

    let replicaShape = [...[...shapes]];
    const lastShape = replicaShape[replicaShape.length - 1];

    if (!canvasDiv || !canvasContainer) {
      console.error(`Element with id ${"canvas"} not found`);
      return;
    }
    // canvasContainer.style.zoom = `100%`;
    dispatch(setScale(100));
    // dispatch(updateShape({ ...lastShape, id: v4() }));

    try {
      const dataUrl = await toPng(canvasDiv, {
        quality: 1,
        pixelRatio: 1,
        height: canvas?.height || 400,
        width: canvas?.width || 400,
      });
      const link = document.createElement("a");
      link.download = `${projectName}.png`;
      link.href = dataUrl;
      link.click();
      console.log({ oldZoom });

      dispatch(setZoomScale(oldZoom));
    } catch (error) {
      console.error("Failed to convert HTML element to image:", error);
    }
  };
  return (
    <Button
      className="text-[25px] border-slate-200 rounded-[8px] "
      variant={"outline"}
      onClick={downloadImage}
    >
      <MdDownload />
    </Button>
  );
};

export default DownloadButton;
