import React, { ReactNode, useRef, forwardRef, Ref, useState, useEffect, useCallback, useImperativeHandle } from 'react';
import { message, Space, Button, Switch } from 'antd';
import LiveSearch from '@/common/components/live-search/index';
import LiveTable from '@/common/components/live-table/index';
import LivePagination from '@/common/components/live-pagination/index';
import { EffectJsonFormConfig, JsonDatePickerConfig } from '@/common/components/live-search/types/index';
import { PaginationType } from '@/common/components/live-pagination/types/index';

function StandardPage(props: Props, ref: Ref<unknown>) {
	
	const liveSeachRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const liveTableRef = useRef<HTMLDivElement>(null);
	let [data, setData] = useState<Array<Record<string, unknown>>>([]);
	// 分页
	const [pagination, setPagination] = useState<PaginationType>({
		pageNum: props.paginationConfig?.pageNum || 1,
		pageSize: props.paginationConfig?.pageSize || 10
	});
	const [total, setTotal] = useState(props.paginationConfig?.total || 0);
	// 处理请求数据
	const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});
	const searchParamsRef = useRef();
	// 发送请求
	const submit = async () => {
		try {
			const res = await props.config.fetchConfig(searchParamsRef.current);
			data = res.data.list;
			setData([...data]);
			setPagination((prev) => {
				return {
					...prev,
					pageNum: res.data.pageNum,
					pageSize: res.data.pageSize,
				}
			});
			setTotal(res.data.total)
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	// 搜索请求
	const onSelect = () => {
		const form = liveSeachRef.current?.getFormValue() || {};
		setPagination((prev) => ({
			...prev,
			pageNum: 1
		}));
		const list = {
			...searchParams,
			...form,
			pageNum: 1,
			pageSize: pagination.pageSize
		};
		searchParamsRef.current = list;
		setSearchParams({
			...list
		});
		submit();
	}

	// 分页请求
	const handleChildUpdate = async (value: PaginationType) => {
		// 修改分页
		setPagination((prev) => ({
			...prev,
			pageNum: value.pageNum,
			pageSize: value.pageSize
		}))
		const form = liveSeachRef.current?.getFormValue() || {};
		const list = {
			...searchParams,
			...form,
			pageNum: value.pageNum,
    		pageSize: value.pageSize
		};
		searchParamsRef.current = list;
		setSearchParams({...list});
		submit();
	}
	useEffect(() => {
		onSelect()
	}, [])

	useImperativeHandle(ref, () => {
        return {
			select: onSelect
        }
    });
	
	return (
		<div>
			<LiveSearch
				ref={liveSeachRef}
				config={props.config.row}
				isPreAdd={false}
				onUpdateSearch={onSelect}
			></LiveSearch>
			<LiveTable
				ref={liveTableRef}
				config={props.config.row}
				data={data}
				pagination={pagination}
				liveTableRender={props.liveTableRender || {}}
				tableLeftButton={props?.tableLeftButton}
			>
			</LiveTable>
			<LivePagination { ...pagination } total={total} pageSizeOptions={props.paginationConfig?.pageSizeOptions} onUpdate={handleChildUpdate}></LivePagination>
		</div>
	);
}

interface Props {
	config: {
		row: Array<EffectJsonFormConfig>,
		fetchConfig: Function
	},
	paginationConfig?: PaginationType;
	onPreAdd?: () => void;
	isPreAdd?: boolean;
	operation?: any;
	liveTableRender?: any;
	tableLeftButton?: JSX.Element;
}


export default forwardRef<any, Props>(StandardPage);
