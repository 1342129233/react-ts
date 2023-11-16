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
            key: 'title',
            value: '',
            label: '',
            placeholder: '',
            table: {
                label: "专题名称"
            }
        },
        {
            key: 'categoryName',
            value: '',
            label: '所属分类',
            placeholder: '',
            table: {}
        },
        {
            key: 'createTime',
            value: '',
            label: '添加时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const createTime = formatDate(momentFormat(record.createTime)) as string;
                    return <div>{ createTime }</div>
                }
            }
        }
    ] as EffectJsonFormConfig[];
    
    return {
        rows
    }
}

