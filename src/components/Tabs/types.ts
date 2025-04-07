interface TabTypes{
    id: string,
    name: string
}
export interface TabContentTypes{
  id: string,
  name: string,
  types:  TabTypes[]
}
export interface TabListTypes{
   id: string,
   name: string,
   icon: string,
   iconColor?: string,
   tabIndex: number,
   ariaSelected?: boolean,
   content: TabContentTypes[]
}

