"use client";

import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface DroppableSectionProps {
  children: React.ReactNode;
  sectionId: string;
}

const DroppableSection: React.FC<DroppableSectionProps> = ({ children, sectionId }: {children: React.ReactNode, sectionId: string}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: sectionId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "bg-blue-100" : ""} transition-colors duration-200`}
    >
      {children}
    </div>
  );
};

export default DroppableSection;
