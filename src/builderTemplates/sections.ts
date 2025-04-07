import heroImg from '../assets/laptopImg.jpg';
import { SectionType } from "../types/builderTypes";

export const defaultSections: SectionType[] = [
  {
    id: "section-hero-1",
    name: "Hero Section",
    elements: [
      {
        id: "el-heading-1",
        type: "heading",
        content: "Build Stunning Websites Effortlessly",
        styles: {
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#1a202c", 
        },
      },
      {
        id: "el-paragraph-1",
        type: "paragraph",
        content:
          "Start creating beautiful pages with our easy-to-use drag and drop builder. No coding required!",
        styles: {
          fontSize: "1.25rem",
          color: "#4a5568", 
          marginBottom: "1.5rem",
        },
      },
      {
        id: "el-button-1",
        type: "button",
        content: "Get Started",
        styles: {
          backgroundColor: "#3b82f6", 
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          cursor: "pointer",
        },
      },
      {
        id: "el-img-1",
        type: "image",
        content: `${heroImg}`,
        styles: {
          width: "100%",
          maxWidth: "500px",
          marginTop: "2rem",
          borderRadius: "0.5rem",
        },
      },
    ],
    styles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      backgroundColor: "#f0f4f8", 
      textAlign: "center",
    },
  },
];

