import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SectionDropArea from "./SectionDropArea";
import { updateSectionOrder } from "../../store/features/builderSlice";

const DndWrapper = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state:RootState)=>state.builder.sections);
    const sectionIds = sections.map((section)=> section.id);
    const sensors = useSensors(
        useSensor(PointerSensor)
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if(active.id !== over?.id){
            const oldIndex = sectionIds.indexOf(active.id as string);
            const newIndex = sectionIds.indexOf(over?.id as string);

            const newOrder = arrayMove(sections,oldIndex,newIndex);
            dispatch(updateSectionOrder(newOrder));
        }
    }

    return(
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
               {
                sections.map((section)=>(
                  <SectionDropArea key={section.id} section={section}/>
                ))
               }
            </SortableContext>
        </DndContext>
    )
};

export default DndWrapper;