import { convertMap } from '@/common/utils';

export const info = {
    adminCount:0,
    createTime: '',
    description: '',
    name: '',
    sort: 0,
    status: 1
}

export function formItemFn() {
    const config = [
        {
            name: 'name',
            label: '角色名称:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'description',
            label: '角色名称:',
            value: '',
            tag: 'textArea',
            placeholder: ''
        },
        {
            name: 'status',
            label: '是否启用:',
            value: 0,
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(enableMap)
            }
        }
    ]

    return {
        config
    }
}

export enum enableEnum {
    NO = 0,
    YES = 1
}

export const enableMap: {[key in enableEnum]: string} = {
    [enableEnum.NO]: '否',
    [enableEnum.YES]: '是'
}
