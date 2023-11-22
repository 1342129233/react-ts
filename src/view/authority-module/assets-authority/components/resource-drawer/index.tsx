import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef  } from 'react';
import { message } from 'antd';
import { SelectOptions } from '@/common/components/live-search/types/index';
import LiveForm from '@/common/components/live-form/index';
import TheDrawer from '@/common/components/the-drawer/index';
import { DataType } from '../../types';
import { info, formItemFn } from './configs';
import { resourceCreate, resourceUpdate } from './server';

function ResourceDrawer(props: PropsType, ref: Ref<unknown>) {
    const { resourceData, options, getList } = props;
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
			value.id ? await resourceUpdate(value) : await resourceCreate(value);
			getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    const { config } = formItemFn(options);
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    useEffect(() => {
        if(resourceData) {
            setDataInfo({
                ...resourceData
            })
        } else {
            setDataInfo({
                ...info
            })
        }
    }, [resourceData])

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
    resourceData: DataType | null;
    options: SelectOptions[],
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(ResourceDrawer);
