
import { SelectOptions } from '@/common/components/live-search/types/index';

export const info = {
    categoryId: '',
    createTime: '',
    description: '',
    name: '',
    url: ''
}

export function formItemFn(options: SelectOptions[]) {
    const config = [
        {
            name: 'name',
            label: '资源名称:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'url',
            label: '资源路径:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'categoryId',
            label: '资源分类:',
            value: '',
            tag: 'select',
            placeholder: '',
            search: {
                options: options
            }
        },
        {
            name: 'description',
            label: '描述:',
            value: '',
            tag: 'textArea',
            placeholder: ''
        }
    ]

    return {
        config
    }
}

