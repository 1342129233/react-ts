import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef  } from 'react';
import { message } from 'antd';
import { SelectOptions } from '@/common/components/live-search/types/index';
import LiveForm from '@/common/components/live-form/index';
import TheDrawer from '@/common/components/the-drawer/index';
import { DataType } from '../../types';
import { info, formItemFn } from './configs';
import { adminUserCreate, adminUserUpdate } from './server';

function UserDrawer(props: PropsType, ref: Ref<unknown>) {
    const { userData, getList } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const [dataInfo, setDataInfo] = useState<DataType>(info);

    const onSubmit = async () => {
        const fieldsValue = LiveFormRef.current?.getFormValue();
        const value = {
            ...dataInfo,
            ...fieldsValue
        }
        try {
			value.id ? await adminUserUpdate(value) : await adminUserCreate(value);
			getList();
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
    useEffect(() => {
        if(userData) {
            setDataInfo({
                ...userData
            })
        } else {
            setDataInfo({
                ...info
            })
        }
    }, [userData])

    return <TheDrawer
        title="用户"
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
    userData: DataType | null;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(UserDrawer);
