import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef  } from 'react';
import { message } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import LiveForm from '@/common/components/live-form/index';
import { convertMap, momentFormat, formatDate, dayjsDate } from '@/common/utils';
import { formItemFn } from './configs';
import { info } from './configs';
import { FormData } from './types';
import { advertiseUpdate, advertiseUpdated, advertiseCreate } from './server';

function AdvertiseDrawer(props: PropsType, ref: Ref<unknown>) {
    const { id = null, getList } = props;
    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataInfo, setDataInfo] = useState<FormData>(info);

    const { config } = formItemFn();
    const onSubmit = async () => {
        const fieldsValue = LiveFormRef.current?.getFormValue();
        const values = {
            ...dataInfo,
            ...fieldsValue,
            startTime: +momentFormat(fieldsValue['startTime'].format()),
            endTime: +momentFormat(fieldsValue['endTime'].format()),
            status: fieldsValue.status ? 1 : 0,
            pic: fieldsValue.fileList[0].url
        }
        const { fileList, ...form } = values;
        try {
			values.id ? await advertiseUpdated(form) : await advertiseCreate(form);
			getList();
            setOpenDrawer(false);
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const getForm = async () => {
        try {
            const res = await advertiseUpdate(id!);
            const startTime = dayjsDate(res.data.startTime) as unknown as string;
            const endTime =  dayjsDate(res.data.endTime) as unknown as string;
            setDataInfo({
                ...res.data,
                startTime,
                endTime,
                fileList: [{
                    uid: '' + res.data.id!,
                    name: res.data.name,
                    url: res.data.pic
                }],
            })
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    useEffect(() => {
        if(id) {
            getForm();
        } else {
            setDataInfo({
                ...info,
                fileList: [],
            })
        }
    }, [id])

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
        <></>
    </TheDrawer>
}

interface PropsType {
    id: null | number;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(AdvertiseDrawer);

