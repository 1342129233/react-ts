export const info = {
    name: '',
    sort: '',
    createTime: ''
}

export function formItemFn() {
    const config = [
        {
            name: 'name',
            label: '名称:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'sort',
            label: '排序:',
            value: '',
            tag: 'input',
            placeholder: ''
        }
    ]

    return {
        config
    }
}
