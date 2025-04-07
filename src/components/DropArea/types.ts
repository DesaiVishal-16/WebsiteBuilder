export type ElementType = {
  id: string;
  type: "heading" | "paragraph" | "image" | "button";
  content: string;
  styles: Record<string, string>;
};

export type SectionType = {
  id: string;
  name: string;
  elements: ElementType[];
  styles: Record<string, string>;
};
