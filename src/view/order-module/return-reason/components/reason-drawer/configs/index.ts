export let info = {
    createTime: '',
    name: '',
    sort: 0,
    status: 0
}

export function formItemFn() {
    const config = [
        {
            name: 'name',
            label: '原因类型:',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入原因类型' }]
        },
        {
            name: 'sort',
            label: '排序:',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入排序' }]
        },
        {
            name: 'status',
            label: '是否启用:',
            value: '',
            tag: 'switch',
            child: {
                valuePropName:"checked"
            }
        }
    ];

    return {
        config
    }
}
