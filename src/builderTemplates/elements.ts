export type ElementType = {
  id: string;
  type: "heading" | "paragraph" | "image" | "button" | "section";
  content: string;
  styles: Record<string, string>;
};

export const defaultElementStyles = {
  heading: { fontSize: "2rem", fontWeight: "bold" },
  paragraph: { fontSize: "1rem", color: "#333" },
  image: { width: "100%", height: "auto" },
  button: { padding: "0.5rem 1rem", backgroundColor: "#000", color: "#fff" }
};
