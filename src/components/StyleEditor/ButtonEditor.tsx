import { ElementType } from "../../builderTemplates/elements";
import ColorPicker from "./common/ColorPicker";
import FontSizeSelector from "./common/FontSizeSelector";
import StyleSection from "./common/StyleSection";

const ButtonEditor = ({ element, onChange }: { element: ElementType, onChange: (styles: Record<string, string>) => void }) => {
  return (
    <div className="space-y-2">
      <ColorPicker name="Button color"
        value={element.styles.backgroundColor || "#007bff"}
        onChange={(val) => onChange({ ...element.styles, backgroundColor: val })}
      />
      <ColorPicker name="Text color"
        value={element.styles.color || "#ffffff"}
        onChange={(val) => onChange({ ...element.styles, color: val })}
      />
      <FontSizeSelector
        value={element.styles.fontSize || "16px"}
        onChange={(val) => onChange({ ...element.styles, fontSize: val })}
      />
      <StyleSection
        label="Padding"
        value={element.styles.padding || "8px 16px"}
        type="text"
        onChange={(val) => onChange({ ...element.styles, padding: val })}
      />
      <StyleSection
        label="Border Radius"
        value={element.styles.borderRadius || "4px"}
        type="text"
        onChange={(val) => onChange({ ...element.styles, borderRadius: val })}
      />
    </div>
  );
};

export default ButtonEditor;
