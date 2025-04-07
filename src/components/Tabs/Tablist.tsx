import { ElementType } from 'react';
import { TabListTypes } from './types';

interface Props{
    tab: TabListTypes;
    isSelected: boolean;
    selectedTab: ()=>void;
    color:string;
    IconComp: ElementType;
}
const Tablist = ({tab,isSelected,selectedTab,IconComp,color}:Props) => {
    return (

            <div id={tab.id} className={`p-4 cursor-pointer hover:bg-pink-50 ${isSelected ? 'bg-pink-100' : ''} `}
                role="tab" tabIndex={tab.tabIndex} onClick={selectedTab} aria-selected={tab.ariaSelected}>
                    <span className="flex flex-col items-center gap-1 font-bold">
                    {IconComp && <IconComp className="text-2xl" style={{color}}/>}
                    <span>{tab.name}</span>
                </span>
            </div> 
    )
};

export default Tablist;