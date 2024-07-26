"use client";

import BottomBar from "@/components/Canvas/bottomBar/BottomBar";
import CircleCanvas from "@/components/Canvas/CircleCanvas";
import ImageCanvas from "@/components/Canvas/Image";
import RectCanvas from "@/components/Canvas/RectCanvas";
import CanvasSideBar from "@/components/Canvas/sidebar/CanvasSideBar";
import TextCanvas from "@/components/Canvas/TextCanvas";
import TextValueChangeModal from "@/components/Canvas/TextValueChangeModal";
import TopBar from "@/components/Canvas/topBar/TopBar";
import Loader from "@/components/shared/Loader";
import {
  useGetProjectQuery,
  useUpdateProjectShapeMutation,
} from "@/redux/features/project/project.api";
import { setProject, setScale } from "@/redux/features/project/project.slice";
import {
  addShape,
  removeShape,
  setSelectedShape,
  setShapes,
  updateShape,
} from "@/redux/features/project/shapes.slice";
import { useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import debounce from "lodash/debounce";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
const ShapeEditor: React.FC = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetProjectQuery(id as string);
  const [update] = useUpdateProjectShapeMutation();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const { zoom } = useAppSelector((state) => state.project);
  const { shapes, selectedShape } = useAppSelector((state) => state.shapes);

  const dispatch = useDispatch();

  const [showSidebar, setShowSidebar] = useState(false);

  const [dragging, setDragging] = useState<IShape | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [resizing, setResizing] = useState<IShape | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // => debouncing api
  const debouncedUpdate = useMemo(
    () =>
      debounce((id, shapes) => {
        if (!shapes.length) return;
        update({ id, shapes });
      }, 1000),
    [update]
  );

  useEffect(() => {
    debouncedUpdate(id, shapes);

    return () => {
      debouncedUpdate.cancel();
    };
  }, [shapes, debouncedUpdate, id]);

  // --> initial project setup ⚙️
  useEffect(() => {
    if (data && data.data) {
      dispatch(setShapes(data.data.shapes));

      const canvasContainer = document.getElementById("canvas-container");
      const canvas = document.getElementById("canvas");
      if (!canvasContainer || !canvas) return;

      const width = data.data.canvas.width;
      const height = data.data.canvas.height;
      const projectName = data.data.projectName || "";

      const canvasConatinerWidth = canvasContainer.offsetWidth * (zoom / 100);
      const canvasConatinerHeight = canvasContainer.offsetHeight * (zoom / 100);

      const scaleWidth = canvasConatinerWidth / width;
      const scaleHeight = canvasConatinerHeight / height;

      // ---> minimum scale to fit both dimensions
      const scale = Math.min(scaleWidth, scaleHeight) * 100;

      if (scale > 0 && scale < 110) {
        const projectPayload = {
          projectName,
          canvas: {
            width,
            height,
          },
          isExtended: true,
          zoom: Number(scale.toFixed(2)),
        };

        dispatch(setProject(projectPayload));
      } else {
        const projectPayload = {
          projectName,
          canvas: {
            width,
            height,
          },
          isExtended: true,
          zoom: 100,
        };

        dispatch(setProject(projectPayload));
      }
    }
  }, [data, dispatch]);

  const RESIZE_HANDLE_SIZE = 15;

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    shape: IShape,
    resize: boolean = false
  ) => {
    e.stopPropagation();
    setIsMouseDown(true);
    if (resize) {
      setResizing(shape);
    } else {
      setDragging(shape);
      setOffset({
        x: e.clientX / (zoom / 100) - shape.x,
        y: e.clientY / (zoom / 100) - shape.y,
      });
    }
    dispatch(setSelectedShape(shape));
  };

  const editText = (value: string) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape?.id) {
        return { ...shape, text: value };
      }
      return shape;
    });
    dispatch(setShapes(newShapes));
  };

  // ---> keyboard events ⌨️ ⌨️
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keycode = e.keyCode;

      const keyCodes = [37, 38, 39, 40];

      // to delete the element
      if (keycode === 46 && selectedShape) {
        dispatch(removeShape(selectedShape.id));
      }

      if (e.ctrlKey && e.key === "c" && selectedShape) {
        navigator.clipboard.writeText(selectedShape.id || "").catch((err) => {
          console.error("Could not copy text: ", err);
        });
      }

      if (selectedShape) {
        // -> prevent default behavbior
        if (keyCodes.includes(keycode)) {
          e.preventDefault();
        }

        if (keycode === 38) {
          // up arrow key=> 38
          const replicashape = { ...selectedShape };
          replicashape.y -= 5 / (zoom / 100);
          dispatch(updateShape(replicashape));
          dispatch(setSelectedShape(replicashape));
        }
        // down arrow key=> 40
        if (keycode === 40) {
          const replicashape = { ...selectedShape };
          replicashape.y += 5 / (zoom / 100);
          dispatch(updateShape(replicashape));
          dispatch(setSelectedShape(replicashape));
        }
        // left arrow key=>37
        if (keycode === 37) {
          const replicashape = { ...selectedShape };
          replicashape.x -= 5 / (zoom / 100);
          dispatch(updateShape(replicashape));
          dispatch(setSelectedShape(replicashape));
        }
        // left arrow key=>39
        if (keycode === 39) {
          const replicashape = { ...selectedShape };
          replicashape.x += 5 / (zoom / 100);
          dispatch(updateShape(replicashape));
          dispatch(setSelectedShape(replicashape));
        }
      }

      if (e.ctrlKey && e.key === "v") {
        navigator.clipboard
          .readText()
          .then((pastedText) => {
            const shapeToClone = shapes.find(
              (shape) => shape.id === pastedText
            );
            if (shapeToClone) {
              const newCloneShape = {
                ...shapeToClone,
                x: 80,
                y: 50,
                zIndex: shapes.length,
                id: uuid(),
              };

              dispatch(addShape(newCloneShape));
              dispatch(setSelectedShape(newCloneShape));
            }
          })
          .catch((err) => {
            console.error("Could not read text from clipboard: ", err);
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape, shapes, dispatch]);

  // ---> wheel event 🛞
  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;

    const handleMoveMouseWheel = (e: WheelEvent | any) => {
      e.preventDefault();
      const deltaY = e.wheelDelta;

      if (e.ctrlKey) {
        deltaY > 0 ? dispatch(setScale(10)) : dispatch(setScale(-10));
      }
    };

    if (!canvasContainer) return;

    canvasContainer.addEventListener("wheel", handleMoveMouseWheel);
    return () => {
      canvasContainer.removeEventListener("wheel", handleMoveMouseWheel);
    };
  }, [dispatch, canvasContainerRef, zoom]);

  // --> mouse move event 🐭
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const canvas = document.getElementById("canvas") as HTMLElement;
    if (e.ctrlKey && isMouseDown && canvas) {
      canvas.style.cursor = "grab";
    }

    if (e.ctrlKey && canvasContainerRef.current && isMouseDown) {
      const moveX = e.movementX;
      const moveY = e.movementY;
      canvasContainerRef.current.scrollLeft -= moveX;
      canvasContainerRef.current.scrollTop -= moveY;
      canvas.style.cursor = "grabbing";
      return "";
    }
    if (!e.ctrlKey && dragging) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === dragging.id) {
          const newShape = {
            ...shape,
            x: e.clientX / (zoom / 100) - offset.x,
            y: e.clientY / (zoom / 100) - offset.y,
          };

          dispatch(setSelectedShape(newShape));
          return newShape;
        }
        return shape;
      });
      dispatch(setShapes(newShapes));
    }
    if (!e.ctrlKey && resizing) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === resizing.id) {
          if (shape.type === "text" && shape.textStyle?.fontSize) {
            const deltaX = (e.clientX - shape.x) / 2 / (zoom / 100);
            const deltaY = (e.clientY - shape.y) / 2 / (zoom / 100);
            const newFontSize = Math.max(deltaX, deltaY) / 8;

            const { textStyle = {}, ...rest } = shape;
            const newTextStyle = {
              ...textStyle,
              fontSize: newFontSize,
            };

            const newText = { ...rest, textStyle: newTextStyle };
            dispatch(setSelectedShape(newText));
            return newText;
          } else {
            const deltaX = e.movementX;
            const deltaY = e.movementY;

            const newShape = {
              ...shape,
              width: shape.width + deltaX / (zoom / 100),

              height: shape.height + deltaY / (zoom / 100),
            };
            dispatch(setSelectedShape(newShape));
            return newShape;
          }
        }
        return shape;
      });
      dispatch(setShapes(newShapes));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
    setIsMouseDown(false);
    const canvas = document.getElementById("canvas") as HTMLElement;
    canvas.style.cursor = "auto";
  };
  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className="w-full h-[calc(100%-70px)] relative flex items-start justify-start bg-slate-100 gap-[20px]">
      <div
        className="h-full w-[550px]"
        onClick={() => dispatch(setSelectedShape(null))}
      >
        <CanvasSideBar />
      </div>

      <div className="flex w-[calc(100%-550px)] h-full flex-col justify-start items-start gap-[10px]">
        <div className="w-full h-[80px] bg-white flex items-center justify-between px-[30px]">
          <TopBar />
        </div>
        <div
          className="w-full h-full overflow-auto relative"
          style={{ zoom: `${zoom}%` }}
          id="canvas-container"
          ref={canvasContainerRef}
          onMouseUp={handleMouseUp}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseMove={handleMouseMove}
        >
          <div
            className=" overflow-hidden bg-white shrink-0 relative mx-auto"
            id="canvas"
            style={{
              width: data?.data?.canvas.width || "100%",
              height: data?.data?.canvas.height || "100%",
              // aspectRatio: `${data?.data?.canvas.width || 1} /
              // ${data?.data?.canvas.height || 1}`,
            }}
          >
            {shapes.map((shape) => (
              <div
                key={shape.id}
                style={{
                  zIndex: shape.zIndex,
                  position: "absolute",
                  left: shape.x,
                  top: shape.y,
                  transform: `rotate(${shape.rotation}deg)`,
                  display: shape.type === "text" ? "inline-block" : "block",
                  borderWidth: `${2 / (zoom / 100)}px`,
                  userSelect: "none",
                }}
                onMouseDown={(e) => handleMouseDown(e, shape)}
                className={`${
                  selectedShape?.id === shape.id
                    ? "border-[#4c4cff]"
                    : "border-transparent"
                }  p-[5px]`}
              >
                {shape.type === "text" && <TextCanvas shape={shape} />}
                {shape.type === "image" && shape.imageUrl && (
                  <ImageCanvas shape={shape} />
                )}
                {shape.type === "rectangle" && <RectCanvas shape={shape} />}
                {shape.type === "circle" && <CircleCanvas shape={shape} />}
                {/* Resize handle */}
                {selectedShape?.id === shape.id ? (
                  <>
                    <div
                      onMouseDown={(e) => handleMouseDown(e, shape, true)}
                      style={{
                        position: "absolute",
                        width: `${RESIZE_HANDLE_SIZE}px`,
                        height: `${RESIZE_HANDLE_SIZE}px`,
                        bottom: `-${RESIZE_HANDLE_SIZE / 2}px`,
                        right: `-${RESIZE_HANDLE_SIZE / 2}px`,
                        backgroundColor: "white",
                        transform: `scale(${1 / (zoom / 100)})`,
                        border: "1px solid black",
                        cursor: "nwse-resize",
                        borderRadius: "50%",
                      }}
                    ></div>

                    <div
                      className="center absolute top-[-40px] left-0"
                      style={{ gap: `${15 / (zoom / 100)}px` }}
                    >
                      <button
                        style={{ transform: `scale(${1 / (zoom / 100)})` }}
                        className="shadow-md w-[30px] h-[30px] bg-white rounded-full center"
                        onClick={() =>
                          dispatch(removeShape(selectedShape.id || ""))
                        }
                      >
                        <Trash className="w-[15px]" />
                      </button>
                      {shape.type === "text" ? (
                        <TextValueChangeModal
                          value={shape.text || ""}
                          onSubmit={editText}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default ShapeEditor;
