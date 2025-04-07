import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionType } from "../../types/builderTypes";


const SectionDropArea = ({section}: {section: SectionType}) => {
    const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id: section.id})
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        </div>
    )
}
export default SectionDropArea;