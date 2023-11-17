import { EffectJsonFormConfig } from '@/common/components/live-search/types/index';
import { momentFormat, formatDate } from '@/common/utils';
import { DataType } from '../types';
 
export function standardPageModel() {
    const rows = [
        {
            key: 'keyword',
            value: '',
            label: '',
            placeholder: '专题名称搜索',
            search: {
                type: 'input',
            }
        },
        {
            key: 'name',
            value: '',
            label: '',
            placeholder: '',
            table: {
                label: "专题名称"
            }
        },
        {
            key: 'productSn',
            value: '',
            label: '货号',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <div>NO: { record.productSn }</div>
                }
            }
        },
        {
            key: 'price',
            value: '',
            label: '价格',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <div>¥{ record.price }</div>
                }
            }
        }
    ] as EffectJsonFormConfig[];
    
    return {
        rows
    }
}

