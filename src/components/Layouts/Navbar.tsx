import { useState } from "react";
import tabList from "../../data/navigationTabs.json"
import { Icons } from "../../assets";
import { TabContent, Tablist } from "../Tabs";

interface Props{
  isOpen: boolean;
}

const Navbar = ({isOpen}:Props) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  
  const handleSelected = (index:number) => {
    setActiveIdx(index)
  }
  
    return (
        <aside className={`bg-[#ffffff] border-2 border-gray-400 w-1/4 h-[calc(100vh-3rem)] overflow-hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duation-300 z-10`}>
          <nav className="flex">
            <div className="tablist flex flex-col w-24 border-r-2 h-screen border-gray-200">
            {
              tabList && 
              tabList.map((tab,index)=>{
                  const IconComp = Icons[tab.icon] || "div";
                  const color = tab["icon-color"]
                return( 
                  /* Tab list*/
                    <Tablist key={tab.id} tab={tab} isSelected={activeIdx === index} selectedTab={()=>handleSelected(index)} IconComp={IconComp} color={color}/> 
                )
              })
            }
            </div>
           {/* TabContent */}
           <div className="tabContent w-full">
            <div className="">
              <h2 className="text-lg text-red-400 font-semibold text-center bg-gray-100 p-2">{tabList[activeIdx].name}</h2> 
              {
                tabList[activeIdx] && tabList[activeIdx].content.map((contentItem)=>(
                  <TabContent key={contentItem.id} tab={contentItem} />
                )) 
                
             } 
            </div>
           </div>
          </nav>
        </aside>
    )
};
export default Navbar;