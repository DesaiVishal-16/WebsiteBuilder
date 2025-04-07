import { useState } from "react";
import { Header, Navbar } from "../components";
import StyleEditor from "../components/StyleEditor";
import SectionEditor from "../components/StyleEditor/SectionEditor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {updateElementStyle,addElementToSection,setSelectedElement} from "../store/features/builderSlice";
import MainPage from "../components/Layouts/MainPage";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { nanoid } from "@reduxjs/toolkit";

const EditSite = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const selectedElement = useSelector((state: RootState) => {
    const selected = state.builder.selectedElement;
    if (!selected) return null;

    if (selected.type === "element") {
      const section = state.builder.sections.find(sec => sec.id === selected.sectionId);
      const element = section?.elements.find(el => el.id === selected.elementId);
      if (element) {
        return {
          type: "element" as const,
          sectionId: selected.sectionId,
          elementId: selected.elementId,
          element,
        };
      }
    }

    if (selected.type === "section") {
      return {
        type: "section" as const,
        sectionId: selected.sectionId,
      };
    }

    return null;
  });

  const handleStyleChange = (styles: Record<string, string>) => {
    if (!selectedElement || selectedElement.type !== "element") return;

    dispatch(
      updateElementStyle({
        sectionId: selectedElement.sectionId,
        elementId: selectedElement.elementId,
        styles,
      })
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    // Close navbar on drag start (corrected syntax)
    setTimeout(() => setIsNavbarOpen(false), 2000);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("Drag Ended");
    console.log("Active ID:", active.id);
    console.log("Over ID:", over?.id);
    console.log("Active Data:", active.data?.current);

    if (!over || !active.data?.current) return;
    if(!over){
      console.warn("Dropped outside any droppable");
      return;
    }
    const activeData = active.data.current;

    if (activeData.from === "TabContent") {
      const sectionId = over.id.toString();
      const newId = nanoid();

      dispatch(
        addElementToSection({
          sectionId,
          element: {
            id: newId,
            type: activeData.type.type,
            content: activeData.type.name,
            styles: {},
          },
        })
      );

      dispatch(
        setSelectedElement({
          type: "element",
          sectionId,
          elementId: newId,
        })
      );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        toggleNavbar={() => setIsNavbarOpen(prev => !prev)}
        className="fixed top-0 left-0 w-full z-50 shadow-md"
      />

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {}}
      >
        <div className="flex flex-1 relative">
          {isNavbarOpen && (
            <div className="fixed top-[45px] left-0 h-full w-full shadow-lg z-50">
              <Navbar isOpen={isNavbarOpen} />
            </div>
          )}

          <div className="flex-1 mt-11 transition-all duration-300">
            <MainPage />
          </div>

          {selectedElement?.type === "element" && selectedElement.element && (
            <div className="w-[300px] mt-10 border border-gray-300 p-4 bg-white flex flex-col gap-5">
              <h2 className="text-lg font-semibold mb-4 border-b-2 pb-2">Style Editor</h2>
              <h4 className="capitalize font-bold text-xl text-blue-400">
                {selectedElement.element.type}
              </h4>
              <StyleEditor
                sectionId={selectedElement.sectionId}
                element={selectedElement.element}
                onChange={handleStyleChange}
              />
            </div>
          )}

          {selectedElement?.type === "section" && (
            <div className="w-[300px] mt-10 border border-gray-300 p-4 bg-white flex flex-col gap-5">
              <h2 className="text-lg font-semibold mb-4 border-b-2 pb-2">Section Style Editor</h2>
              <SectionEditor sectionId={selectedElement.sectionId} />
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default EditSite;

