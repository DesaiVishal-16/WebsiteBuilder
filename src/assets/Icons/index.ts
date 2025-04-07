import { ElementType } from "react";
import { MdAdd } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { HiRectangleGroup } from "react-icons/hi2";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";

const Icons:Record<string,ElementType> = {
   Add : MdAdd,
   AddACircle:  MdOutlineAddCircleOutline,
   section: HiRectangleGroup,
   element: TbTriangleSquareCircleFilled,
}

export default Icons;
