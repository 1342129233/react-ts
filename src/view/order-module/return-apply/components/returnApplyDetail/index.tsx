import React, { useState, useEffect, ReactNode, Ref, useImperativeHandle, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Descriptions, Image, Input, Select, Table, message } from 'antd';
import { useDidUpdateEffect } from '@/common/hooks/useDidUpdateEffect';
import TheDrawer from '@/common/components/the-drawer/index';
import { ReturnApplyDataType } from './types';
import { getReturnApplyDetails } from './server';
import { ressList } from '@/common/public-fetch';
import type { RessListType } from '@/common/public-fetch';
import { itemsA, itemsB, itemsC, itemsD  } from './configs';
import './style/index.less';

function ReturnApplyDetail(props: PropsType, ref: Ref<unknown>) {
    const { id } = props;
    const navigate = useNavigate();
    // 全部数据
    const [data, setData] = useState<ReturnApplyDataType | null>(null)
    // 收货点接口
    const [ressOption, setRessOption] = useState<RessListType[]>([])
    // 退货表格
    const [productData, setProductData] = useState<ReturnApplyDataType[]>([])
    // 窗口
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const returnApplyDetails = async (id: number) => {
        try {
            const res = await getReturnApplyDetails(id);
            const { data } = res;
            setData({
                ...data
            })
            const list = [
                {
                    ...data
                }
            ]
            setProductData([...list])
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
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    useEffect(() => {
        ress()
    }, [])
    useDidUpdateEffect(() => 
		id !== 0 && returnApplyDetails(id)
	, [id])
    const look = (_: ReturnApplyDataType) => {
		navigate(`/order-module/order-detail?id=${_.id}`);
	}
    const functionWithSwitch = (key: string, data: ReturnApplyDataType) => {
        switch(key){
            case 'orderSn': 
                return (
                    <div>{data[key]} <span className='look' onClick={() => look(data)}>查看</span></div>
                )
            case 'proofPics': 
                const img = data.proofPics.split(',');
                return (
                    <>
                        {
                            img.map((item) => <Image
                                key={item}
                                width={100}
                                src={item}
                            />)
                        }
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
    const columns = [
        {
            title: '图片',
            dataIndex: 'name',
            key: 'name',
            render: (_: ReturnApplyDataType, record: ReturnApplyDataType) => (
                <Image
                    width={100}
                    src={record.productPic}
                />
            )
        },
        {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
            render: (_: ReturnApplyDataType, record: ReturnApplyDataType) => (
                <>
                    <div>{record.productName}</div>
                    <div>品牌: {record.productBrand}</div>
                </>
            )
        },
        {
            title: '价格/货号',
            dataIndex: 'productId',
            key: 'productId',
            render: (_: ReturnApplyDataType, record: ReturnApplyDataType) => (
                <>
                    <div>价格: ¥{record.productRealPrice}</div>
                    <div>货号: NO.{record.productId}</div>
                </>
            )
        },
        {
            title: '属性',
            dataIndex: 'productAttr',
            key: 'productAttr'
        },
        {
            title: '数量',
            dataIndex: 'productCount',
            key: 'productCount'
        },
        {
            title: '小计',
            dataIndex: 'productRealPrice',
            key: 'productRealPrice',
            render: (_: ReturnApplyDataType, record: ReturnApplyDataType) => (
                <>
                    <div> ¥{record.productRealPrice}</div>
                </>
            )
        }
    ]
    return <TheDrawer
                title="退货原因详情"
                open={openDrawer}
                showFooter={true}
                onOpenClose={(value) => setOpenDrawer(value)}
            >
                <div className="sendBackProduct">
                    <div className="text">退货商品</div>
                    <Table columns={columns} dataSource={productData} pagination={false} rowKey={(record: any) => record.id} />
                    <div className="price">合计: <span className="productRealPriceColor">¥{ data && data.productRealPrice }</span></div>
                </div>
                <div>
                    <Descriptions 
                        title="服务单信息" 
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
            </TheDrawer>
}

interface PropsType {
    id: number;
}
export default forwardRef<HTMLDivElement, PropsType>(ReturnApplyDetail);
