import React, { useState, useRef, useImperativeHandle, Ref, forwardRef, useEffect } from 'react';
import { message, Button } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import LiveForm from '@/common/components/live-form/index';
import { useDidUpdateEffect } from '@/common/hooks/useDidUpdateEffect';
import { createReturnReason, updateReturnReason, getReturnReason } from '../../server';
import { info, formItemFn } from './configs';
import { DataType } from '../../types';

function reasonDrawer(props: PropsType, ref: Ref<unknown>) {
    let { getList, id } = props;
    const [dataInfo, setDataInfo] = useState<DataType>(info);
    const [openDrawer, setOpenDrawer] = useState(false);
    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const isInitialRender = useRef(true); // 用于标记是否是首次渲染
    const onSubmit = async () => {
        const form = LiveFormRef.current?.getFormValue();
        try {
            form.id ? await updateReturnReason(form) : await createReturnReason(form);
            getList();
            setOpenDrawer(false);
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    }
    const { config } = formItemFn();
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    const returnReasonId = async (id: number) => {
        try {
            const res = await getReturnReason(id);
            const { data } = res;
            setDataInfo({
				...data
			})
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    }
    useDidUpdateEffect(() => 
		id !== 0 ? returnReasonId(id) : setDataInfo({...info})
	, [id])
    return <TheDrawer
        title="商品品牌"
        open={openDrawer}
        onOpenClose={(value) => setOpenDrawer(value)}
        onSave={() => onSubmit()}
    >
        <LiveForm
            ref={LiveFormRef}
            config={config}
            dataInfo={dataInfo}
            inlineOperate={<></>}
        />
    </TheDrawer>
}

interface PropsType {
    getList: () => void;
    id: number;
}

export default forwardRef<HTMLDivElement, PropsType>(reasonDrawer);
