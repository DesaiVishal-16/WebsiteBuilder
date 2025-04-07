import { useDispatch } from "react-redux";
import { ElementType } from "../../builderTemplates/elements";
import StyleSection from "./common/StyleSection";
import { updateElementContent } from "../../store/features/builderSlice";

const ImageEditor = ({sectionId ,element, onChange }: {sectionId: string, element: ElementType, onChange: (styles: Record<string, string>) => void }) => {
 const dispatch = useDispatch();

  const handleImageChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0];
       if(!file)return;
       const reader = new FileReader();
       reader.onload = () => {
        const imageUrl = reader.result as string;
         
        dispatch(updateElementContent({
          sectionId,
          elementId: element.id,
          newContent: imageUrl
        }))
       };
       reader.readAsDataURL(file);
  }
  return (
    <div className="space-y-5">
      <img src={element.content} alt="Selected" className="w-full max-w-xs rounded"/>
      <label htmlFor="img-upload" className="block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-center">Change Image </label>
      <input id="img-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
      <div className="mt-4">
      <StyleSection
        label="Width"
        value={element.styles.width || "100px"}
        type="text"
        onChange={(val) => onChange({ ...element.styles, width: val })}
      />
      <StyleSection
        label="Height"
        value={element.styles.height || "100px"}
        type="text"
        onChange={(val) => onChange({ ...element.styles, height: val })}
      />
      <StyleSection
        label="Border Radius"
        value={element.styles.borderRadius || "0px"}
        type="text"
        onChange={(val) => onChange({ ...element.styles, borderRadius: val })}
      />
     </div>
    </div>
  );
};

export default ImageEditor;
