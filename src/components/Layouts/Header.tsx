import { memo } from "react";
import { PrimaryButtom } from "../Buttons";
import { Icons } from "../../assets";

interface Props{
    toggleNavbar: () => void;
    className: string;
}

const Header = ({toggleNavbar,className}:Props) => {
    return(
        <header className={`${className} bg-[#2c3139]`}>
           <PrimaryButtom name="Insert" icon={<Icons.AddACircle />} className="!bg-slate-800" onClick={toggleNavbar}/> 
        </header>
    )
};

export default memo(Header);