import DraggableItem from "../DropArea/DraggableItem";
import { TabContentTypes } from "./types";

interface Props {
  tab: TabContentTypes;
}

const TabContent = ({ tab }: Props) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <h4 className="text-lg text-gray-700 font-semibold pl-2">{tab.name}</h4>

      <div className="grid grid-cols-2 gap-3 px-2">
        {tab.types.map((type) => (
          <DraggableItem key={type.id} type={type} />
        ))}
      </div>
    </div>
  );
};

export default TabContent;

