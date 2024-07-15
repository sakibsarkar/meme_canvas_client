"use client";
import { Button } from "@/components/ui/button";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  color: string;
  rotation: number;
  type: "rectangle" | "circle" | "image" | "text";
  scale: number;
  image?: HTMLImageElement;
  text?: string;
  fontSize?: number;
}

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<IShape[]>([]);
  const [dragging, setDragging] = useState<IShape | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedShape, setSelectedShape] = useState<IShape | null>(null);
  const [resizing, setResizing] = useState<IShape | null>(null);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);

  const drawShapes = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    shapes.forEach((shape) => {
      ctx.save();
      ctx.translate(shape.x + shape.width / 2, shape.y + shape.height / 2);
      ctx.rotate((shape.rotation * Math.PI) / 180);
      ctx.scale(shape.scale, shape.scale);
      ctx.translate(-shape.x - shape.width / 2, -shape.y - shape.height / 2);
      ctx.beginPath();

      if (shape.type === "rectangle") {
        ctx.rect(shape.x, shape.y, shape.width, shape.height);
        ctx.fillStyle = shape.color;
        ctx.fill();
      } else if (shape.type === "circle") {
        const radius = shape.width / 2;
        ctx.arc(
          shape.x + shape.width / 2,
          shape.y + shape.height / 2,
          radius < 0 ? 0 : radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = shape.color;
        ctx.fill();
      } else if (shape.type === "image" && shape.image) {
        ctx.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "text" && shape.text) {
        ctx.font = `${shape.fontSize}px Arial`;
        ctx.fillStyle = shape.color;
        ctx.fillText(shape.text, shape.x, shape.y + (shape.fontSize || 0));
      }

      if (shape.id === selectedShape?.id) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.stroke();
        // Draw resize handle
        ctx.fillStyle = "red";
        ctx.fillRect(
          shape.x + shape.width - 5,
          shape.y + shape.height - 5,
          10,
          10
        );
      }
      ctx.closePath();
      ctx.restore();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 600;
    drawShapes(ctx);
  }, [shapes, selectedShape]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keycode = e.keyCode;
      if (keycode === 46 && selectedShape) {
        const newShapes = shapes.filter(({ id }) => id !== selectedShape.id);
        setShapes(newShapes);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      const isInResizeZone =
        mouseX > shape.x + shape.width - 10 &&
        mouseX < shape.x + shape.width + 10 &&
        mouseY > shape.y + shape.height - 10 &&
        mouseY < shape.y + shape.height + 10;

      if (isInResizeZone) {
        setResizing(shape);
        setResizeDirection("bottom-right");
        return;
      } else if (
        mouseX > shape.x &&
        mouseX < shape.x + shape.width &&
        mouseY > shape.y &&
        mouseY < shape.y + shape.height
      ) {
        setDragging(shape);
        setSelectedShape(shape);
        setOffset({
          x: mouseX - shape.x,
          y: mouseY - shape.y,
        });
        return;
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragging) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === dragging.id) {
          return {
            ...shape,
            x: mouseX - offset.x,
            y: mouseY - offset.y,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    } else if (resizing) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === resizing.id) {
          if (resizeDirection === "bottom-right") {
            if (shape.type === "circle") {
              return {
                ...shape,
                width: mouseX - shape.x,
              };
            } else if (shape.type === "text") {
              return {
                ...shape,
                fontSize: Math.max(mouseY - shape.y, 10), // Minimum font size of 10
              };
            } else {
              return {
                ...shape,
                width: mouseX - shape.x,
                height: mouseY - shape.y,
              };
            }
          }
        }
        return shape;
      });
      setShapes(newShapes);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
    setResizeDirection(null);
  };

  const addRectangle = () => {
    const newShape: IShape = {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      color: "blue",
      id: uuidv4(),
      type: "rectangle",
      rotation: 0,
      scale: 1,
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = () => {
    const newShape: IShape = {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      color: "green",
      id: uuidv4(),
      type: "circle",
      rotation: 0,
      scale: 1,
    };
    setShapes([...shapes, newShape]);
  };

  const addText = () => {
    const newShape: IShape = {
      x: 250,
      y: 250,
      width: 0,
      height: 0,
      color: "black",
      id: uuidv4(),
      type: "text",
      rotation: 0,
      scale: 1,
      text: "Sample Text",
      fontSize: 20,
    };
    setShapes([...shapes, newShape]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const newShape: IShape = {
        x: 200,
        y: 200,
        width: image.width,
        height: image.height,
        color: "",
        id: uuidv4(),
        type: "image",
        rotation: 0,
        scale: 1,
        image,
      };
      setShapes([...shapes, newShape]);
    };
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (!selectedShape) return;
    const newShape = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, color };
      }
      return shape;
    });

    setShapes(newShape);
  };

  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rotation = Number(e.target.value);
    if (!selectedShape) return;
    const newShape = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, rotation };
      }
      return shape;
    });
    setSelectedShape(
      newShape.find(({ id }) => id === selectedShape.id) as IShape
    );

    setShapes(newShape);
  };

  return (
    <div className="w-full h-screen center">
      <div>
        <div className="flex items-center gap-[10px] mb-[20px]">
          <Button onClick={addRectangle} className="bg-slate-400">
            Add Rectangle
          </Button>
          <Button onClick={addCircle} className="bg-slate-400">
            Add Circle
          </Button>
          <Button onClick={addText} className="bg-slate-400">
            Add Text
          </Button>

          <div className="center gap-[10px]">
            <p>Rotation {selectedShape?.rotation || 0} Deg:</p>
            <input
              type="range"
              max={360}
              value={selectedShape?.rotation || 0}
              onChange={handleChangeRotation}
            />
          </div>

          <div className="center gap-[5px]">
            <p>Color:</p>
            <input
              type="color"
              defaultValue={"#0000ff"}
              onChange={handleChangeColor}
              disabled={!selectedShape}
              className="disabled:opacity-[0.5]"
            />
          </div>

          <div className="center gap-[10px]">
            <p>Scale {selectedShape?.scale || 1}:</p>
          </div>

          <input type="file" onChange={handleImageUpload} />
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: "2px solid black" }}
        />
      </div>
    </div>
  );
};

export default Canvas;
