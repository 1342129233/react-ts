import React, { ReactNode, useRef, forwardRef, Ref, useState, useEffect, useCallback, useImperativeHandle } from 'react';
import { message, Space, Button, Switch } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import LiveSearch from '@/common/components/live-search/index';
import LiveTable from '@/common/components/live-table/index';
import LivePagination from '@/common/components/live-pagination/index';
import { EffectJsonFormConfig, JsonDatePickerConfig } from '@/common/components/live-search/types/index';
import { usePage, PageType, PaginationProps } from '@/common/hooks/usePage';

function StandardPage(props: Props, ref: Ref<unknown>) {
	const { formName="liveSearch", tablePopover = true, isPreAdd= false, isLiveSearchRequest = true } = props;
	const { paginationConfig = false, config, isRowSelection = true, tableLeftButton = <></> } = props;
	const liveSeachRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const liveTableRef = useRef<HTMLDivElement & { selectedRowKeys: Function }>(null);
	let [data, setData] = useState<Array<Record<string, unknown>>>([]);
	const searchParamsRef = useRef();
	// 发送请求
	const submit = async () => {
		const params = config.formateSearchParams?.(searchParamsRef.current) ?? searchParamsRef.current;
		try {
			const res = await config.fetchConfig(params);
			const dataList = config.formateSearchResolve ? config.formateSearchResolve(res) : res.data.list;
			setData([...dataList]);
			if(paginationConfig) {
				setPage((prev) => {
					return {
						...prev,
						pageNum: res.data.pageNum,
						pageSize: res.data.pageSize,
						total: res.data.total
					}
				});
			}
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	
	// 搜索请求
	const onSelect = async (pageValue: PageType) => {
		const form = liveSeachRef.current?.getFormValue() || {};
		const list = {
			...form,
			pageNum: pageValue.pageNum ?? page.pageNum,
			pageSize: pageValue.pageSize ?? page.pageSize,
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
			},
			tableData: data
        }
    });
	// 分页
	const { paginationProps, page, setPage } = usePage(onSelect);
	return (
		<div>
			<LiveSearch
				ref={liveSeachRef}
				config={props.config.rows}
				isPreAdd={isPreAdd}
				formName={formName}
				isLiveSearchRequest={isLiveSearchRequest}
				onUpdateSearch={() => onSelect({pageNum: 1,pageSize: page.pageSize })}
			></LiveSearch>
			<LiveTable
				ref={liveTableRef}
				config={props.config.rows}
				data={data}
				pagination={paginationConfig}
				liveTableRender={props.liveTableRender || {}}
				tableLeftButton={tableLeftButton}
				isRowSelection={isRowSelection}
				tablePopover={tablePopover}
			>
			</LiveTable>
			{
				paginationConfig ? <LivePagination pagination={ paginationProps } page={page} /> : null
			}
		</div>
	);
}

interface Props {
	config: {
		rows: Array<EffectJsonFormConfig>,
		fetchConfig: Function,
		formateSearchParams?: (params: any)=> unknown,
		formateSearchResolve?: (params: any)=> unknown
	},
	paginationConfig?: TablePaginationConfig | false;
	onPreAdd?: () => void;
	isPreAdd?: boolean;
	operation?: any;
	liveTableRender?: any;
	tableLeftButton?: JSX.Element;
	isRowSelection?: boolean;
	formName?: string
	tablePopover?: boolean;
	isLiveSearchRequest?: boolean
}


export default forwardRef<any, Props>(StandardPage);
