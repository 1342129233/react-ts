import { ReactNode } from 'react';

export interface RouterType { 
    path: string;
    label: string;
    key: string;
    icon: JSX.Element;
    element?: ReactNode;
    children?: RouterType[];
    meta: {
        invisible?: boolean;
        path: string[]
    }
}