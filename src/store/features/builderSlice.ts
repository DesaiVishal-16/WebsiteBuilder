import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ElementType, SectionType } from "../../types/builderTypes";
import { defaultSections } from "../../builderTemplates/sections";

interface BuilderState {
  sections: SectionType[];
  selectedElement: {
    sectionId: string,
    elementId: string,
    type: string,
  } | null;
  activeElementId: string | null,
}

interface updateElementContentPayload {
  sectionId: string;
  elementId: string;
  newContent: string;
}
interface updateElementStyle{
  sectionId: string,
  elementId: string,
  styles: Record<string,string>,
}
const savedSections = localStorage.getItem("builderState");
const parsedSections = savedSections ? JSON.parse(savedSections) : defaultSections;
const initialState: BuilderState = {
  sections: parsedSections,
  selectedElement: null,
  activeElementId: null,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setSections: (state, action: PayloadAction<SectionType[]>) => {
      state.sections = action.payload;
    },
    setSelectedElement: (state,action:PayloadAction<{sectionId:string,elementId: string,type:string} | null>) => {
      state.selectedElement = action.payload;
    },
    updateElementContent: (state, action: PayloadAction<updateElementContentPayload>) => {
      const { sectionId, elementId, newContent } = action.payload;
      const section = state.sections.find((sec: any) => sec.id === sectionId);
      if (!section) return;

      const element = section.elements.find((e:any) => e.id === elementId);
      if (element) {
        element.content = newContent;
      }
    },
    updateElementStyle: (state,action: PayloadAction<updateElementStyle>) => {
       const { sectionId,elementId,styles } = action.payload;
       const section = state.sections.find((sec:any)=>sec.id === sectionId);
       const element = section?.elements.find((e:any)=> e.id === elementId);
       if(element){
        element.styles = {...element.styles, ...styles}
       }
    },
    updateSectionStyle: (state,action: PayloadAction<{sectionId: string;styles: Record<string, string>}>) => {
      const section = state.sections.find(
        (sec:any) => sec.id === action.payload.sectionId
      );
       if (section) {
         section.styles = action.payload.styles;
       }
     },
     updateSectionOrder: (state,action) => {
         state.sections = action.payload
     },
     addElementToSection: (
      state,
      action: PayloadAction<{
        sectionId: string;
        element: ElementType;
      }>
    ) => {
      const { sectionId, element } = action.payload;
      const section = state.sections.find((sec) => sec.id === sectionId);
      if (!section) return;
      section.elements.push({
        ...element,
        id: nanoid(), 
      });
    },
     setActiveElementId(state,action: PayloadAction<string | null>){
       state.activeElementId = action.payload;
     } 
     },
    });

export const { setSections, setSelectedElement, updateElementContent,updateElementStyle, updateSectionStyle, updateSectionOrder, addElementToSection, setActiveElementId } = builderSlice.actions;
export default builderSlice.reducer;
