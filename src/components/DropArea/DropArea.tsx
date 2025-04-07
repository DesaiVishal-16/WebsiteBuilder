"use client";

import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setSelectedElement,
  updateElementContent,
} from "../../store/features/builderSlice";
import { ElementType, SectionType } from "../../types/builderTypes";
import DroppableSection from "./DroppableSection";

const DropArea = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state: RootState) => state.builder.sections);
  const selected = useSelector((state: RootState) => state.builder.selectedElement);

  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editingRect, setEditingRect] = useState<DOMRect | null>(null);

  const handleElementClick = (
    e: React.MouseEvent,
    sectionId: string,
    element: ElementType
  ) => {
    e.stopPropagation();
    dispatch(setSelectedElement({ sectionId, elementId: element.id, type: "element" }));
  };

  const handleDoubleClick = (
    event: React.MouseEvent,
    sectionId: string,
    element: ElementType
  ) => {
    event.stopPropagation();
    setEditingElementId(element.id);
    setEditedContent(element.content);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setEditingRect(rect);
    console.log(sectionId)
  };

  const handleBlur = (sectionId: string, elementId: string) => {
    dispatch(updateElementContent({ sectionId, elementId, newContent: editedContent }));
    setEditingElementId(null);
  };

  const renderElement = (element: ElementType, sectionId: string) => {
    const commonProps = {
      onClick: (e: React.MouseEvent) => handleElementClick(e, sectionId, element),
      onDoubleClick: (e: React.MouseEvent) => handleDoubleClick(e, sectionId, element),
      style: element.styles,
      className: `hover:outline hover:outline-2 hover:outline-blue-400 p-1 ${
        selected?.elementId === element.id ? "outline outline-2 outline-blue-600" : ""
      }`,
    };

    switch (element.type) {
      case "heading":
        return <h2 key={element.id} {...commonProps}>{element.content}</h2>;
      case "paragraph":
        return <p key={element.id} {...commonProps}>{element.content}</p>;
      case "image":
        return <img key={element.id} src={element.content} alt="img" {...commonProps} />;
      case "button":
        return <button key={element.id} {...commonProps}>{element.content}</button>;
      default:
        return null;
    }
  };

  if (sections.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center text-gray-500">
          <p>No sections available. Add a section to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen">
      {sections.map((section: SectionType) => (
        <DroppableSection key={section.id} sectionId={section.id}>
          <div
            style={section.styles}
            className="border border-gray-300 rounded p-6 mb-6 min-h-[300px]"
            onClick={() =>
              dispatch(
                setSelectedElement({ type: "section", sectionId: section.id, elementId: "" })
              )
            }
          >
            {section.elements.map((element: ElementType) => (
              <div key={element.id}>
                {editingElementId === element.id && editingRect && (
                  <textarea
                    ref={textAreaRef}
                    value={editedContent}
                    autoFocus
                    onChange={(e) => setEditedContent(e.target.value)}
                    onBlur={() => handleBlur(section.id, element.id)}
                    className="absolute p-1 border border-blue-400 rounded resize-none bg-white z-50"
                    style={{
                      top:
                        editingRect.top +
                        window.scrollY -
                        (containerRef.current?.getBoundingClientRect().top || 0),
                      left:
                        editingRect.left +
                        window.scrollX -
                        (containerRef.current?.getBoundingClientRect().left || 0),
                      width: editingRect.width,
                      height: editingRect.height,
                      fontSize: "inherit",
                    }}
                  />
                )}
                {renderElement(element, section.id)}
              </div>
            ))}
          </div>
        </DroppableSection>
      ))}
    </div>
  );
};

export default DropArea;