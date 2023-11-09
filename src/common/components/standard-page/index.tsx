import React, { ReactNode, useRef, forwardRef, Ref, useState, useEffect, useCallback, useImperativeHandle } from 'react';
import { message, Space, Button, Switch } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import LiveSearch from '@/common/components/live-search/index';
import LiveTable from '@/common/components/live-table/index';
import LivePagination from '@/common/components/live-pagination/index';
import { EffectJsonFormConfig, JsonDatePickerConfig } from '@/common/components/live-search/types/index';
import { usePage, PageType, PaginationProps } from '@/common/hooks/usePage';

function StandardPage(props: Props, ref: Ref<unknown>) {
	const { paginationConfig = false, config } = props;
	const liveSeachRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const liveTableRef = useRef<HTMLDivElement & { selectedRowKeys: Function }>(null);
	let [data, setData] = useState<Array<Record<string, unknown>>>([]);
	const searchParamsRef = useRef();
	// 发送请求
	const submit = async () => {
		const params = config.formateSearchParams?.(searchParamsRef.current) ?? searchParamsRef.current;
		try {
			const res = await props.config.fetchConfig(params);
			data = res.data.list;
			setData([...data]);
			setPage((prev) => {
				return {
					...prev,
					pageNum: res.data.pageNum,
					pageSize: res.data.pageSize,
					total: res.data.total
				}
			});
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	
	// 搜索请求
	const onSelect = async (pageValue: PageType) => {
		const form = liveSeachRef.current?.getFormValue() || {};
		const list = {
			...form,
			pageNum: pageValue.pageNum,
			pageSize: pageValue.pageSize
		};
		searchParamsRef.current = list;
		submit();
	}

	
	useEffect(() => {
		onSelect(page)
	}, [])

	useImperativeHandle(ref, () => {
        return {
			select: onSelect,
			tableSelectedRowKeys: () => {
				return liveTableRef.current?.selectedRowKeys;
			}
        }
    });
	// 分页
	const { paginationProps, page, setPage } = usePage(onSelect);
	return (
		<div>
			<LiveSearch
				ref={liveSeachRef}
				config={props.config.rows}
				isPreAdd={false}
				onUpdateSearch={() => onSelect({pageNum: 1,pageSize: page.pageSize })}
			></LiveSearch>
			<LiveTable
				ref={liveTableRef}
				config={props.config.rows}
				data={data}
				pagination={paginationConfig}
				liveTableRender={props.liveTableRender || {}}
				tableLeftButton={props?.tableLeftButton}
			>
			</LiveTable>
			<LivePagination pagination={ paginationProps } page={page} />
		</div>
	);
}

interface Props {
	config: {
		rows: Array<EffectJsonFormConfig>,
		fetchConfig: Function,
		formateSearchParams?: (params: any)=> unknown,
	},
	paginationConfig?: TablePaginationConfig | false;
	onPreAdd?: () => void;
	isPreAdd?: boolean;
	operation?: any;
	liveTableRender?: any;
	tableLeftButton?: JSX.Element;
}


export default forwardRef<any, Props>(StandardPage);
