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
            key: 'related',
            value: '',
            label: '相关',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <div>
                        <div>商品: { record.productCount }</div>
                        <div>评价: { record.productCommentCount }</div>
                    </div>
                }
            }
        }
    ] as EffectJsonFormConfig[];
    
    return {
        rows
    }
}

