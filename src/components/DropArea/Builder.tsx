"use client";

import { DndContext, DragOverlay, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ElementType } from "../../types/builderTypes";
import { addElementToSection, setSelectedElement } from "../../store/features/builderSlice";
import { nanoid } from "@reduxjs/toolkit";
import DropArea from "./DropArea";

const Builder = () => {
  const dispatch = useDispatch();
  const [activeData, setActiveData] = useState<any>(null);
  const activeElementId = useSelector(
    (state: RootState) => state.builder.activeElementId
  );
  const sections = useSelector((state: RootState) => state.builder.sections);
  
  const activeElement: ElementType | null = (() => {
    for (const section of sections) {
      const found = section.elements.find((el) => el.id === activeElementId);
      if (found) return found;
    }
    return null;
  })();
  console.log(activeElement) 
  const handleDragStart = (event: DragStartEvent) => {
    setActiveData(event.active.data.current);
    console.log("Drag started:", event.active.id, event.active.data.current);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    console.log("Drag ended - Full event:", event);
    console.log("Active ID:", active.id);
    console.log("Over:", over); 
    console.log("Active Data:", active.data?.current);
    
    setActiveData(null); 
    
    if (!over) {
      console.log("No valid drop target");
      return;
    }
    
    console.log("Over ID:", over.id);
    console.log("Over Data:", over.data?.current);
    
    const data = active.data?.current;
    if (!data) {
      console.log("No valid drag data");
      return;
    }
    
    const sectionId = over.id.toString();
    
    console.log(`Adding element to section: ${sectionId}`);
    
    if (data.from === "TabContent") {
      const elementType = data.type.id || "paragraph";
      const elementContent = data.type.name || "New Element";
      const newId = nanoid();
      
      const targetSectionId = sectionId || (sections[0]?.id || "default-section");
      
      console.log(`Target section ID: ${targetSectionId}`);
      
      dispatch(
        addElementToSection({
          sectionId: targetSectionId,
          element: {
            id: newId,
            type: elementType,
            content: elementContent,
            styles: {},
          },
        })
      );
      
      dispatch(
        setSelectedElement({
          type: "element",
          sectionId: targetSectionId,
          elementId: newId,
        })
      );
    }
  };
  
  const hasSections = sections.length > 0;
  
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveData(null)}
    >
      {!hasSections && (
        <div className="flex justify-center items-center h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No sections available. Add sections first.</p>
        </div>
      )}
      
      <DropArea />
      
      <DragOverlay>
        {activeData?.from === "TabContent" && (
          <div className="p-2 bg-white shadow-md border rounded max-w-sm">
            {activeData.type.id === "heading" && <h2>Heading</h2>}
            {activeData.type.id === "paragraph" && <p>Paragraph</p>}
            {activeData.type.id === "button" && <button>Button</button>}
            {activeData.type.id === "buttonIcon" && (
              <button>Button with Icon</button>
            )}
            {activeData.type.id === "image" && (
              <img
                src="https://via.placeholder.com/150"
                alt="Preview"
                className="max-w-[150px] max-h-[100px]"
              />
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Builder;