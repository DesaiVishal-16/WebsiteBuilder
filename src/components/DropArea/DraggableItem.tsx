import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

interface Type {
  id: string;
  name: string;
}

interface Props {
  type: Type;
}

const DraggableItem = ({ type }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${type.id}`,
    data: {
      from: "TabContent",
      type,
    },
  });

  useEffect(() => {
    if (isDragging) {
      console.log(`Dragging item: ${type.name} (${type.id})`);
    }
  }, [isDragging, type]);

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-1 text-sm text-gray-800 rounded-md text-center cursor-grab active:cursor-grabbing transition"
      data-element-type={type.id}
    >
      {type.name}
    </button>
  );
};

export default DraggableItem;

