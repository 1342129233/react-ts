import { advertisingPositionMap } from '@/common/public-type';
import { convertMap, momentFormat, formatDate } from '@/common/utils';

export const info = {
    clickCount: 0,
    endTime: '',
    id: null,
    name: '',
    note: '',
    orderCount:  0,
    pic: '',
    sort:  0,
    startTime: '',
    status:  0,
    type: 0,
    url: '',
}

export function formItemFn() {
    
    const config = [
        {
            name: 'name',
            label: '广告名称:',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入广告名称!' }]
        },
        {
            name: 'type',
            label: '广告位置:',
            value: '',
            tag: 'select',
            placeholder: '',
            search: {
                options: convertMap(advertisingPositionMap)
            }
        },
        {
            name: 'startTime',
            label: '开始时间:',
            value: '',
            tag: 'datePicker',
            placeholder: '',
        },
        {
            name: 'endTime',
            label: '结束时间:',
            value: '',
            tag: 'datePicker',
            placeholder: ''
        },
        {
            name: 'status',
            label: '上线/下线:',
            value: '',
            tag: 'radio',
            search: {
                options: [
                    {
                        value: 1,
                        label: '上线'
                    },
                    {
                        value: 0,
                        label: '下线'
                    }
                ]
            }
        },
        {
            name: 'fileList',
            label: '广告图片:',
            value: '',
            tag: 'upload',
            search: {
                url: '/api/minio/upload',
                maxCount: 1
            },
            child: {
                valuePropName: "fileList",
                getValueFromEvent: (e: any) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e?.fileList;
                }
            }
        },
        {
            name: 'sort',
            label: '排序:',
            value: '',
            tag: 'input'
        },
        {
            name: 'url',
            label: '广告链接:',
            value: '',
            tag: 'input',
            rules: [{ required: true, message: '请输入广告链接!' }]
        },
        {
            name: 'note',
            label: '广告备注:',
            value: '',
            tag: 'textArea'
        }
    ];

    return {
        config
    }
}

