import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Ref } from "react";
import { message } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import LiveForm from '@/common/components/live-form/index';
import { formItemFn, info } from './configs';
import { FormData } from './types'; 
import { updateSort } from './server';

function SortDrawer(props: PropsType, ref: Ref<unknown>) {
    const { form, getList } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const [dataInfo, setDataInfo] = useState<FormData>(info);
    const { config } = formItemFn();

    const onSubmit = async () => {
        const fieldsValue = LiveFormRef.current?.getFormValue();
        const value = {
            id: form.id,
            sort: fieldsValue.sort
        }
        try {
			await updateSort(value)
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

    useEffect(() => {
        setDataInfo({
            id: form.id,
            sort: form.sort
        })
    }, [form.id])
    return <TheDrawer
        title="设置排序"
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
    form: FormData;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(SortDrawer);

