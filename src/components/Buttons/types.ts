import { ReactNode } from "react";

export interface PrimaryButtonTypes{
  className?: string;
  id?: string;
  name: string;
  icon?: ReactNode;
  onClick?: () => void;
}
