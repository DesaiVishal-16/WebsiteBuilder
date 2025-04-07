import { ElementType } from "../../builderTemplates/elements";
import ColorPicker from "./common/ColorPicker";
import FontSizeSelector from "./common/FontSizeSelector";

const HeadingEditor = ({ element, onChange }: { element: ElementType, onChange: (styles: Record<string, string>) => void }) => {
  return (
    <div className="space-y-2">
      <ColorPicker name="Text Color" value={element.styles.color || "#000"} onChange={(val) => onChange({ ...element.styles, color: val })} />
      <FontSizeSelector value={element.styles.fontSize || "24px"} onChange={(val) => onChange({ ...element.styles, fontSize: val })} />
    </div>
  );
};

export default HeadingEditor;
