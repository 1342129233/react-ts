import { FormType } from '../types';

export const formInfo: FormType = {
    description: "",
    icon: "",   
    keywords: "",
    name: "",
    navStatus: 0,
    parentId: 0,
    productAttributeIdList: [
        { value: "" }
    ],
    productUnit: "",
    showStatus: 0,
    sort: 0
}

export enum RevealEnum {
    NO = 0, // 否
    IS = 1, // 是
}

export const REVEAL_MAP: { [key in RevealEnum]: string } = {
    [RevealEnum.NO]: '否',
    [RevealEnum.IS]: '是'
};
