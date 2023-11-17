import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Ref } from "react";
import { message } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import StandardPage from '@/common/components/standard-page/index';
import { standardPageModel } from './configs';
import { fetchConfig, recommendProductCreate } from './server';
import { DataType, RecommendSubjectCreateParams } from './types';

function SpecialSubjectDrawer(props: PropsType, ref: Ref<unknown>) {
    const { getList } = props;
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function, tableData: unknown[] }>();
    const [openDrawer, setOpenDrawer] = useState(false);

    const onSubmit = async () => {
        const idList = standardPageRef.current?.tableSelectedRowKeys() || [];
        if(idList.length === 0) {
			message.error('请先选中目标！');
			return;
		}
        const data = (standardPageRef.current?.tableData) as DataType[] || [] ;
        const list = data.filter((item: DataType) => idList.includes(item.id))
        const recommendSubjectData: RecommendSubjectCreateParams[] = [];
        list.forEach((item: DataType) => {
            recommendSubjectData.push({
                subjectId: item.id,
                subjectName: item.name
            })
        })
        try {
			await recommendProductCreate(recommendSubjectData);
            getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    const { rows } = standardPageModel();
    return <TheDrawer
        title="选择商品"
        open={openDrawer}
        onOpenClose={(value) => setOpenDrawer(value)}
        onSave={() => onSubmit()}
    >
        <StandardPage
            ref={standardPageRef}
            config={{
                rows: rows,
                fetchConfig: fetchConfig
            }}
            tableLeftButton={<></>}
        ></StandardPage>
    </TheDrawer>
}

interface PropsType {
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(SpecialSubjectDrawer);
