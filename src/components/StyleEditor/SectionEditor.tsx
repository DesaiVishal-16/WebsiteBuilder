import { useDispatch, useSelector } from "react-redux";
import StyleSection from "./common/StyleSection";
import { RootState } from "../../store";
import { updateSectionStyle } from "../../store/features/builderSlice";

interface SectionEditorProps {
  sectionId?: string;
}

const SectionEditor = ({ sectionId }: SectionEditorProps) => {
  const dispatch = useDispatch();

  const section = useSelector((state: RootState) =>
    state.builder.sections.find((sec) => sec.id === sectionId)
  );

  if (!section) return null;

  const handleChange = (val: string) => {
    dispatch(
      updateSectionStyle({
        sectionId: section.id,
        styles: {
          ...section.styles,
          backgroundColor: val,
        },
      })
    );
  };

  return (
    <div className="space-y-2">
      <StyleSection
        label="Background Color"
        value={section.styles?.backgroundColor || "#ffffff"}
        onChange={handleChange}
      />
    </div>
  );
};

export default SectionEditor;

