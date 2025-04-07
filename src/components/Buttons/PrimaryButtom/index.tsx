import { PrimaryButtonTypes } from "../types";

const PrimaryButton = ({className,name,id,onClick,icon}:PrimaryButtonTypes) => {
    return (
        <button className={`${className} bg-blue-600 border border-transparent text-white text-xl font-semibold rounded-sm px-4 py-2 cursor-pointer hover:bg-blue-700 flex items-center gap-1`} onClick={onClick} id={id}>
            {icon}
            {name}
        </button>
    )
}
export default PrimaryButton;