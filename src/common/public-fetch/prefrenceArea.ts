import { get } from '@/common/axios/index';

export interface PrefrenceAreaType {
    id: number;
    showStatus: number;
    subTitle: string;
    name: string;
}

export interface PrefrenceAreaResolve {
    code: number;
    message: string;
    data: PrefrenceAreaType[];
}


export const prefrenceAreaList = () => {
    return get<PrefrenceAreaResolve>('/api/prefrenceArea/listAll')
}

