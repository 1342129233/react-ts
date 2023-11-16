import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Ref } from "react";
import { message } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import LiveForm from '@/common/components/live-form/index';
import { momentFormat, formatDate, dayjsDate } from '@/common/utils';
import { formItemFn, info } from './configs';
import { FormData } from './types';
import { flashUpdate, flashCreate } from './server';


function ActivityDrawer(props: PropsType, ref: Ref<unknown>) {
    const { data, getList } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const { config } = formItemFn();
    const [dataInfo, setDataInfo] = useState<FormData>(info);

    const onSubmit = async () => {
        const fieldsValue = LiveFormRef.current?.getFormValue();
        const values = {
            ...dataInfo,
            ...fieldsValue,
            startDate: +momentFormat(fieldsValue['startDate'].format()),
            endDate: +momentFormat(fieldsValue['endDate'].format()),
            status: fieldsValue.status ? 1 : 0
        }
        try {
			values.id ? await flashUpdate(values) : await flashCreate(values);
			getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    useEffect(() => {
        const form = {
            ...info,
            ...data,
            startDate: data.startDate ? dayjsDate(data.startDate) as unknown as string : '',
            endDate: data.endDate ? dayjsDate(data.endDate) as unknown as string : ''
        }
        setDataInfo({
            ...form
        })
    }, [data])
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
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
    data: FormData;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(ActivityDrawer);
