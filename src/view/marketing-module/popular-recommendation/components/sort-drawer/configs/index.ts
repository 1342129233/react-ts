import moment from 'moment';

export const info = {
    id: 0,
    sort: 0
}

export function formItemFn() {
    const config = [
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