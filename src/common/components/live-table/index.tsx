import React, { ReactNode, forwardRef, MutableRefObject, useEffect, Ref, useState, useRef } from 'react';
import { Table, Affix, Button, Popover, Checkbox, Space, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { EffectJsonFormConfig, JsonFormConfig } from '@/common/components/live-search/types';
import { PaginationType } from '@/common/components/live-pagination/types';
import styles from './css/index.module.less';
	
interface Optopns {
	value: string | number;
	label: string;
}

// React.FC<React.PropsWithChildren<Props>>
const LiveTable = (props: Props, ref: Ref<unknown>) => {
	const [columns, setColumns] = useState<ColumnsType<Object>>([]);
	const [options, setOptions] = useState<Optopns[]>([]);
	const [checkboxValue, setCheckboxValue] = useState<CheckboxValueType[]>([]);
	const [dataSource, setDataSource] = useState<Array<Object>>([]);
	const [pagination, setPagination] = useState<PaginationType>({
		pageNum: 1,
    	pageSize: 10,
    	total: 0,
		pageSizeOptions	: [10, 20, 50]
	});

	useEffect(() => {
		const columnList: ColumnsType<Object> = [];
		const liveTableRender = props.liveTableRender || {}
		props.config.forEach((item: EffectJsonFormConfig) => {
			if(item.table) {
				columnList.push({
					title: item.table?.label || item.label,
					width: item?.table?.width,
					dataIndex: item.key,
					key: item.key,
					align: 'center',
					render: item?.table?.render || liveTableRender[item.key] || undefined
				});
				options.push({
					value: item.key,
					label: item.label
				})
			}
			
			setOptions([
				...options
			])
			checkboxValue.push(item.key);
		});
		
		setColumns([
			...columnList
		])
		
	}, []);

	useEffect(() => {
		setDataSource([...props.data])
	}, [props.data])

	useEffect(() => {
		setPagination({
			pageNum: props.pagination?.pageNum || 1,
			pageSize: props.pagination?.pageSize || 10,
			total: props.pagination?.total || 0,
			pageSizeOptions: props.pagination?.pageSizeOptions || [10, 20, 50]
		})
	}, [])

	const handleChildUpdate = (pagination: PaginationType) => {
		console.log('live-table', pagination)
	}
	
	const checkboxOnChange = (checkedValues: CheckboxValueType[]) => {
		// 筛选
		const list: ColumnsType<Object> = [];
		props.config.forEach((item) => {
			if(checkedValues.includes(item.key as string)){
				list.push({
					title: item.label,
					width: 100,
					dataIndex: item.key,
					key: item.key,
					render: item.table?.render
				})
			}
		})
		setColumns([
			...list
		])
		setCheckboxValue([
			...checkedValues
		])
	};

	const content = (
		<div style={{ width: 120 }}>
			<Checkbox.Group
				options={options}
				defaultValue={checkboxValue}
				onChange={checkboxOnChange}
			/>
		</div>
	);
	
	return (
		<div className="mgt10">
			<div className={styles.tableTop} >
				<div>{props.tableLeftButton}</div>
				<div className='mgb10'>
					<Affix offsetTop={10}>
						<Popover placement="right" title={'修改表格展示内容'} content={content} trigger="click">
							<Button type="primary">修改列表展示</Button>
						</Popover>
					</Affix>
				</div>
			</div>
			<Table 
				columns={columns} 
				dataSource={dataSource} 
				style={{ width: '100%', overflowX: 'auto' }}
				pagination={false}
				rowKey={(record: any) => record.id + Date.now()}
			>
			</Table>
		</div>
	);
}

interface Props {
	config: Array<EffectJsonFormConfig>,
	data: Array<any>,
	pagination?: PaginationType,
	children?: ReactNode,
	operation?: EffectJsonFormConfig;
	liveTableRender: any;
	tableLeftButton?: JSX.Element;
}

export default forwardRef<HTMLDivElement, Props>(LiveTable);
