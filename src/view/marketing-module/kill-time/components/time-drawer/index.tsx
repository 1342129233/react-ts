import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Ref } from "react";
import { message, Form, Input, Radio, TimePicker } from 'antd';
import dayjs from 'dayjs';
import TheDrawer from '@/common/components/the-drawer/index';
import { momentFormat, formatDate, dayjsDate, convertMap } from '@/common/utils';
import { info, statusMap } from './configs';
import { flashSessionCreate, flashSessionUpdate } from './server';
import { DataType } from '../../types';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  

function TimeDrawer(props: PropsType, ref: Ref<unknown>) {
    const { data, getList } = props;

    const [form] = Form.useForm();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataInfo, setDataInfo] = useState<DataType>({...info});

    const onSubmit = async () => {
        const fieldsValue = form.getFieldsValue();
        const values = {
            ...dataInfo,
            ...fieldsValue,
            startTime: fieldsValue['startTime'].format(),
            endTime: fieldsValue['endTime'].format(),
            status: fieldsValue.status ? 1 : 0
        }
        try {
			values.id ? await flashSessionUpdate(values) : await flashSessionCreate(values);
			getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    useEffect(() => {
        
        if(data) {
            const value = {
                ...info,
                ...data,
                startTime:  dayjs(dayjs(data.startTime).format()),
                endTime: dayjs(dayjs(data.endTime).format())
            }
            setDataInfo({
                ...value
            })
            form.setFieldsValue({
				...value
			})
        } else {
            setDataInfo({
                ...info
            });
            form.setFieldsValue({
				...info
			})
        }
    }, [data])

    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    return <TheDrawer
        title="时间段"
        open={openDrawer}
        onOpenClose={(value) => setOpenDrawer(value)}
        onSave={() => onSubmit()}
    >
        <Form
            {...layout}
            form={form}
            name="time-drawer-form"
            style={{ maxWidth: 600 }}
            >
            <Form.Item name="name" label="秒杀时间段名称:">
                <Input />
            </Form.Item>
            <Form.Item name="startTime" label="每日开始时间:">
                <TimePicker format='HH:mm:ss'/>
            </Form.Item>
            <Form.Item name="endTime" label="每日结束时间:">
                <TimePicker format='HH:mm:ss'/>
            </Form.Item>
            <Form.Item name="status" label="是否启用:">
                <Radio.Group>
                    {
                        convertMap(statusMap).map((item) => (
                            <Radio value={item.value} key={item.value}>{item.label}</Radio>
                        ))
                    }
                </Radio.Group>
            </Form.Item>
        </Form>
    </TheDrawer>
}

interface PropsType {
    data: DataType | null;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(TimeDrawer);