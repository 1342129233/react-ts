import moment from 'moment';

export const info = {
    createTime: '',
    endDate: '',
    id: 0,
    startDate: '',
    status: 0,
    title: ''
}

export function formItemFn() {
    const config = [
        {
            name: 'title',
            label: '活动标题:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'startDate',
            label: '开始时间:',
            value: '',
            tag: 'datePicker',
            placeholder: '',
        },
        {
            name: 'endDate',
            label: '结束时间:',
            value: '',
            tag: 'datePicker',
            placeholder: ''
        },
        {
            name: 'status',
            label: '上线/下限:',
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