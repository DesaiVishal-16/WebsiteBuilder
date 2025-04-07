import { ElementType } from "../../types/builderTypes";
import ButtonEditor from "./ButtonEditor";
import HeadingEditor from "./HeadingEditor";
import ImageEditor from "./ImgEditor";
import ParagraphEditor from "./ParagraphEditor";

const StyleEditor = ({
  element,
  sectionId,
  onChange,
}: {
  element: ElementType;
  sectionId?: string;
  onChange: (styles: Record<string, string>) => void;
}) => {
  const handleElementStyleChange = (updatedStyles: Record<string, string>) => {
    onChange(updatedStyles);
  };

  return (
    <div className="space-y-4">
      {element.type === "heading" && (
        <HeadingEditor element={element} onChange={handleElementStyleChange} />
      )}
      {element.type === "paragraph" && (
        <ParagraphEditor
          element={element}
          onChange={handleElementStyleChange}
        />
      )}
      {element.type === "button" && (
        <ButtonEditor element={element} onChange={handleElementStyleChange} />
      )}
      {element.type === "image" && sectionId && (
        <ImageEditor
          sectionId={sectionId}
          element={element}
          onChange={handleElementStyleChange}
        />
      )}
    </div>
  );
};

export default StyleEditor;

