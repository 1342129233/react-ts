export interface RouterType { 
    path: string;
    label: string;
    key: string;
    icon: JSX.Element;
    element?: JSX.Element;
    children?: RouterType[];
    meta: {
        invisible?: boolean;
        path: string[]
    }
}