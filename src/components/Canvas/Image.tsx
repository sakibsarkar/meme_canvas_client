import { IShape } from "@/types/shape";
import Image from "next/image";
const ImageCanvas = ({ shape }: { shape: IShape }) => {
  if (shape.type !== "image") {
    return <></>;
  }

  return (
    <Image
      width={shape.width}
      height={shape.height}
      src={shape.imageUrl as string}
      alt="shape"
      className="no-drag"
      style={{ width: `${shape.width}px`, height: "auto" }}
      id={shape.id}
    />
  );
};

export default ImageCanvas;
