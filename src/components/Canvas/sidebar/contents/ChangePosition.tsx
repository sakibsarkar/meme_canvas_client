import {
  setSelectedShape,
  setShapes,
} from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";

const Shape: React.FC<{
  shape: IShape;
}> = ({ shape }) => {
  const { selectedShape } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, data } =
    useSortable({ id: shape.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  const cursor = {
    cursor: style.transform ? "grabbing" : "grab",
  };

  const handleSetSelectedShape = () => {
    dispatch(setSelectedShape(shape));
  };

  return (
    <div className="w-full" onMouseDown={handleSetSelectedShape} style={cursor}>
      <div
        className={`w-[90%] py-[8px] px-[10px] border-[2px]  flex items-center justify-between mx-auto bg-[#fffffff1] rounded-[8px] ${
          selectedShape?.id === shape.id
            ? "border-[#6c61ff]"
            : "border-borderColor"
        }`}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ ...style, ...cursor }}
      >
        <HiDotsVertical />
        {shape.type === "rectangle" && (
          <div
            style={{
              width: 100,
              height: 50,
              cursor: "unset",
              backgroundColor: shape.color,
              borderRadius: `${shape.radius}%`,
            }}
          />
        )}
        {shape.type === "circle" && (
          <div
            {...attributes}
            {...listeners}
            style={{
              width: 50,
              height: 50,
              backgroundColor: shape.color,
              cursor: "unset",
              borderRadius: `${shape.radius}%`,
            }}
          />
        )}
        {shape.type === "text" && (
          <div
            {...attributes}
            {...listeners}
            style={{
              width: "100%",
              cursor: "unset",
              textAlign: "center",
              borderRadius: `${shape.radius}%`,
            }}
          >
            {shape.text}
          </div>
        )}
        {shape.type === "image" && (
          <Image
            width={60}
            height={60}
            alt=""
            src={shape.imageUrl as string}
            {...attributes}
            {...listeners}
            style={{
              textAlign: "center",
              height: "auto",
              cursor: "unset",
              borderRadius: `${shape.radius}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};

const ChangePosition = () => {
  const sensiors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

  const { shapes, selectedShape } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();

  const getShapePosition = (id: any) => {
    return shapes.findIndex((shape) => shape.id === id);
  };

  const handleDrag = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id === over?.id) return;

    const shapePosition = getShapePosition(active.id);
    const newPosition = getShapePosition(over?.id);

    const newArr = arrayMove(shapes, shapePosition, newPosition);

    const newArrIndex = newArr.map((shape, i) => {
      // ⚠️⚠️ <----- the first element will have the large zindex ------>
      const lastIndex = newArr.length - 1;
      const index = lastIndex - i;

      return { ...shape, zIndex: index };
    });

    dispatch(setShapes(newArrIndex));
  };

  return (
    <div>
      <DndContext
        {...sensiors}
        collisionDetection={closestCenter}
        onDragEnd={handleDrag}
      >
        <div className="flex flex-col gap-[20px]">
          <SortableContext
            items={shapes}
            strategy={verticalListSortingStrategy}
          >
            {[...shapes].map((shape) => (
              <Shape key={shape.id} shape={shape} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default ChangePosition;
