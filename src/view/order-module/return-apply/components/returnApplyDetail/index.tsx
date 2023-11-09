import React, { useState, useEffect, ReactNode } from 'react';
import { Badge, Descriptions, Image, Input, Select, message } from 'antd';
import type { DescriptionsProps, DescriptionsItemType } from 'antd/es/descriptions';
import { ReturnApplyDataType } from './types';
import { getReturnApplyDetails } from './server';
import { ressList } from '@/common/public-fetch';
import type { RessListType } from '@/common/public-fetch';

 
function ReturnApplyDetail() {
    const itemsA = [
        {
            key: 'id',
            label: '服务单号',
            children: '',
            span: 3
        },
        {
            key: 'status',
            label: '申请状态',
            children: '',
            span: 3
        },
        {
            key: 'orderSn',
            label: '订单编号',
            children: '',
            span: 3
        },
        {
            key: 'createTime',
            label: '申请时间',
            children: '',
            span: 3
        },
        {
            key: 'memberUsername',
            label: '用户账号',
            children: '',
            span: 3
        },
        {
            key: 'returnName',
            label: '联系人',
            children: '',
            span: 3
        },
        {
            key: 'returnPhone',
            label: '联系电话',
            children: '',
            span: 3
        },
        {
            key: 'reason',
            label: '退货原因',
            children: '',
            span: 3
        },
        {
            key: 'description',
            label: '问题描述',
            children: '',
            span: 3
        },
        {
            key: 'pics',
            label: '凭证图片',
            children: '',
            span: 3
        }
    ]

    const itemsB = [
        {
            key: 'productRealPrice',
            label: '订单金额',
            children: '已完成',
        },
        {
            key: 'returnAmount',
            label: '确认退款金额',
            children: 3,
        },
        {
            key: 'companyAddressId',
            label: '选择收货点',
            children: 3,
        },
        {
            key: 'returnName',
            label: '选择收货姓名',
            children: 3,
        },
        {
            key: 'companyAddress.province.city.region',
            label: '所在区域',
            children: 3,
        },
        {
            key: 'companyAddress.detailAddress',
            label: '详细地址',
            children: 3,
        },
        {
            key: 'returnPhone',
            label: '联系电话',
            children: 3,
            span: 3
        }
    ]

    const itemsC = [
        {
            key: 'receiveMan',
            label: '处理人员',
            children: ''
        },
        {
            key: 'handleTime',
            label: '处理时间',
            children: ''
        },
        {
            key: 'handleNote',
            label: '处理备注',
            children: ''
        }
    ]

    const itemsD  = [
        {
            key: 'receiveMan',
            label: '收货人员',
            children: ''
        },
        {
            key: 'receiveTime',
            label: '收货时间',
            children: ''
        },
        {
            key: 'receiveNote',
            label: '收货备注',
            children: ''
        }
    ]
    const [data, setData] = useState<ReturnApplyDataType | null>(null)
    const [ressOption, setRessOption] = useState<RessListType[]>([])
    
    const returnApplyDetails = async () => {
        try {
            const res = await getReturnApplyDetails();
            const { data } = res;
            setData({
                ...data
            })
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    }
    const ress = async () => {
        const res = await ressList();
        setRessOption([
            ...res.data
        ])
    }
    useEffect(() => {
        returnApplyDetails()
        ress()
    }, [])
    const functionWithSwitch = (key: string, data: ReturnApplyDataType) => {
        switch(key){
            case 'pics': 
                return (
                    <>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            className="mgl10"
                        />
                    </>
                )
            case 'productRealPrice':
                return `¥${data[key]}`
            case 'returnAmount': 
                return (
                    <Input prefix="￥" suffix="RMB" disabled value={data[key]} />
                )
            case 'companyAddress.province.city.region':
                const { province, city, region } = data.companyAddress;
                return <>
                    {province} - {city} - {region}
                </>
            case 'companyAddress.detailAddress':
                const { detailAddress } = data.companyAddress;
                return <>
                    {detailAddress}
                </>
            case 'companyAddressId':
                const { companyAddressId } = data;
                const options: {value: number; label: string}[] = []
                ressOption.forEach((item: RessListType) => {
                    options.push({
                        value: item.id,
                        label: item.addressName
                    })
                });
                return <>
                    <Select
                        defaultValue={companyAddressId}
                        style={{ width: 300 }}
                        options={options}
                        disabled
                    />
                </>
            default:
                return data[key] as ReactNode
        }
    }
    return <>
        <div>
            退货商品
        </div>
        <div>
            <Descriptions 
                title="" 
                bordered
                column={1}
                labelStyle={{width: 200}}
                className="mgt10"
            >
                {
                    data && itemsA.map((item) => {
                        return <Descriptions.Item key={item.key} label={item.label}>
                            { functionWithSwitch(item.key, data) }
                        </Descriptions.Item>
                    })
                }
            </Descriptions>
            <Descriptions 
                title="" 
                bordered
                column={1}
                labelStyle={{width: 200}}
                className="mgt10"
            >
                {
                    data && itemsB.map((item) => {
                        const value = data[item.key] as ReactNode;
                        return <Descriptions.Item key={item.key} label={item.label}>
                            { functionWithSwitch(item.key, data) }
                        </Descriptions.Item>
                    })
                }
            </Descriptions>
            <Descriptions 
                title="" 
                bordered
                column={1}
                labelStyle={{width: 200}}
                className="mgt10"
            >
                {
                    data && itemsC.map((item) => {
                        const value = data[item.key] as ReactNode;
                        return <Descriptions.Item key={item.key} label={item.label}>
                            { functionWithSwitch(item.key, data) }
                        </Descriptions.Item>
                    })
                }
            </Descriptions>
            <Descriptions 
                title="" 
                bordered
                column={1}
                labelStyle={{width: 200}}
                className="mgt10"
            >
                {
                    data && itemsD.map((item) => {
                        const value = data[item.key] as ReactNode;
                        return <Descriptions.Item key={item.key} label={item.label}>
                            { functionWithSwitch(item.key, data) }
                        </Descriptions.Item>
                    })
                }
            </Descriptions>
        </div>
    </>
}

export default ReturnApplyDetail;
