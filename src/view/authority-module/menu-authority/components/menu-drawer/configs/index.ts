import moment from 'moment';
import { convertMap } from '@/common/utils';
import { Options } from '../types';

export const info = {
    createTime: "",
    hidden: 0,
    icon: "",
    level: 0,
    name: '',
    parentId: 0,
    sort: 0,
    title: ''
}

export function formItemFn(menuOptions: Options[]) {
    const config = [
        {
            name: 'title',
            label: '菜单名称:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'parentId',
            label: '上级菜单:',
            value: '',
            tag: 'select',
            placeholder: '',
            search: {
                options: menuOptions
            }
        },
        {
            name: 'name',
            label: '前端名称:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'icon',
            label: '前端图标:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'hidden',
            label: '是否显示:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(showMap)
            }
        },
        {
            name: 'sort',
            label: '排序:',
            value: '',
            tag: 'input',
            placeholder: ''
        }
    ];

    return {
        config
    }
} 

export enum showEnum {
    NO = 1,
    YES = 0
}

export const showMap: {[key in showEnum]: string} = {
    [showEnum.NO]: '否',
    [showEnum.YES]: '是'
}
