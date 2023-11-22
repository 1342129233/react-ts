import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef  } from 'react';
import { message } from 'antd';
import LiveForm from '@/common/components/live-form/index';
import TheDrawer from '@/common/components/the-drawer/index';
import { info, formItemFn } from './configs';
import { create, update } from './server';
import { DataType } from '../../types';

function CategoryDrawer(props: PropsType, ref: Ref<unknown>) {
    const { categoryData = null, getList } = props;

    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataInfo, setDataInfo] = useState<DataType>(info);

    const onSubmit = async () => {
        const fieldsValue = LiveFormRef.current?.getFormValue();
        const value = {
            ...dataInfo,
            ...fieldsValue
        }
        try {
			value.id ? await update(value) : await create(value);
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
        if(categoryData) {
            setDataInfo({
                ...categoryData
            })
        } else {
            setDataInfo({
                ...info
            })
        }
    }, [categoryData])
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
    categoryData: DataType | null;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(CategoryDrawer);
