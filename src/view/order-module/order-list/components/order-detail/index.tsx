import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Steps, Space, Card, Button, message } from 'antd';
import LiveTable from '@/common/components/live-table/index';
import { tableModel } from './configs/index';
import { OrderData, OrderItemType, ProductAttrType, BasicDataType, DistributionDataType, ConsigneeDataType, OrderItemDataType, ExpenseType, HistoryType, ControlsType } from './types';
import { orderId } from './server';
import styles from './style/index.module.less';

function OrderDetail() {
    const [searchRoute] = useSearchParams();
    const navigate = useNavigate();
    const id = searchRoute.get('id');
    // 基本信息
    const [basicInformationData, setBasicInformationData] = useState<BasicDataType[]>([]);
    const [distributionInformationData, setDistributionInformationData] = useState<DistributionDataType[]>([]);
    const [consigneeData, setConsigneeData] = useState<ConsigneeDataType[]>([]);
    const [orderItemData, setOrderItemData] = useState<OrderItemDataType[]>([]);
    const [expenseData, setExpenseData] = useState<ExpenseType[]>([]);
    const [controlsData, setControlsData] = useState<ControlsType[]>([]);

    const { basicRow, distributionRow, consigneeRow, orderItemRow, expenseOneRow, expenseTwoRow, controlsRow } = tableModel();
    const stepsItems = [
        {
            title: '提交订单',
            description: '2018-09-15 12:24:27'
        },
        {
            title: '支付订单',
            description: ''
        },
        {
            title: '平台发货',
            description: ''
        },
        {
            title: '确认收货',
            description: ''
        },
        {
            title: '完成评价',
            description: ''
        }
    ];
    const getOrderList = async () => {
        try {
			const res = await orderId(id!);
			const { data } = res;
            basicClick(data);
            consigneeClick(data);
            orderItemClick(data);
            expenseClick(data);
            controlsClick(data);
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    useEffect(() => {
        if(id) {
            getOrderList();
        } else {
            message.warning('请从订单列表进入')
            navigate(`/order-module/order-list`)
        }
    }, [])
    // 基础信息
    const basicClick = (data: OrderData) => {
        setBasicInformationData([{
            id: data.id,
            orderSn: data.orderSn,
            billContent: data.billContent,
            memberUsername: data.memberUsername,
            payType: data.payType,
            sourceType: data.sourceType,
            orderType: data.orderType
        }])
        setDistributionInformationData([{
            id: data.id,
            deliveryCompany: data.deliveryCompany,
            deliverySn: data.deliverySn,
            autoConfirmDay: data.autoConfirmDay,
            totalAmount: data.totalAmount,
            integration: data.integration,
            promotionInfo: data.promotionInfo
        }])
    }
    const consigneeClick = (data: OrderData) => {
        setConsigneeData([{
            id: data.id,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            receiverPostCode: data.receiverPostCode,
            deliveryAddress: `${data.receiverProvince} ${data.receiverCity} ${data.receiverRegion} ${data.receiverDetailAddress}`
        }])
    }
    const orderItemClick = (data: OrderData) => {
        const item: OrderItemType[] = data.orderItemList;
        const list: OrderItemDataType[] = [];
        item.forEach((item: OrderItemType)  => {
            const productAttr = JSON.parse(item.productAttr) as ProductAttrType[];
            list.push({
                id: item.id,
                productPic: item.productPic,
                productName: {
                    productName: item.productName,
                    productBrand: item.productBrand
                },
                productSn: {
                    productPrice: item.productPrice,
                    productSn: item.productSn
                },
                productAttr: [...productAttr],
                productQuantity: item.productQuantity,
                productPrice: `¥${item.productPrice}`
            })
        });
        setOrderItemData([
            ...list
        ])
    }
    const expenseClick = (data: OrderData) => {
        setExpenseData([
            {
                id: data.id,
                integration: `¥${data.integration}`,
                freightAmount: `¥${data.freightAmount}`,
                couponAmount: `-¥${data.couponAmount}`,
                deleteStatus: `-¥${data.deleteStatus}`,
                promotionAmount: `-¥${data.promotionAmount}`,
                discountAmount:  `-¥${data.discountAmount}`,
                totalAmount: `¥${data.totalAmount}`,
                payAmount: `¥${data.payAmount}`,
            }
        ])
    }
    const controlsClick = (data: OrderData) => {
        const controls: HistoryType[] = data.historyList;
        const list: ControlsType[] = [];
        controls.forEach((item: HistoryType)  => {
            list.push({
                id: item.id,
                operateMan: item.operateMan,
                createTime: item.createTime,
                status: item.orderStatus,
                confirmStatus: data.confirmStatus,
                orderStatus: item.orderStatus,
                note: item.note
            })
        })
        setControlsData([
            ...list
        ])
    }
    const ExtraHtml = () => {
        return <Space size={16}>
            <Button>修改收货人信息</Button>
            <Button>发送站内信</Button>
            <Button>删除订单</Button>
            <Button>备注订单</Button>
        </Space>
    }

    const CardTitle = () => {
        return <>
            <div>当前订单状态：已关闭</div>
        </>
    }
    const liveTableRef = useRef<HTMLDivElement & { selectedRowKeys: Function }>(null);
    return (
        <>
            <div className={styles.orderDetailSteps}>
                <Steps 
                    className="orderDetailSteps"
                    current={1} 
                    labelPlacement="vertical" 
                    items={stepsItems} 
                />
            </div>
            <div className={styles.orderDetailCard}>
                <Space size={16}>
                    <Card title={<CardTitle />} extra={<ExtraHtml />} style={{ width: '100%' }}>
                        <div className="mgt10">
                            <h3>基本信息</h3>
                            <LiveTable
                                ref={liveTableRef}
                                config={basicRow}
                                data={basicInformationData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                            <LiveTable
                                ref={liveTableRef}
                                config={distributionRow}
                                data={distributionInformationData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                        </div>
                        <div className="mgt10">
                            <h3>收货人信息</h3>
                            <LiveTable
                                ref={liveTableRef}
                                config={consigneeRow}
                                data={consigneeData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                        </div>
                        <div className="mgt10">
                            <h3>商品信息</h3>
                            <LiveTable
                                ref={liveTableRef}
                                config={orderItemRow}
                                data={orderItemData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                        </div>
                        <div className="mgt10">
                            <h3>费用信息</h3>
                            <LiveTable
                                ref={liveTableRef}
                                config={expenseOneRow}
                                data={expenseData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                            <LiveTable
                                ref={liveTableRef}
                                config={expenseTwoRow}
                                data={expenseData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                        </div>
                        <div className="mgt10">
                            <h3>操作信息</h3>
                            <LiveTable
                                ref={liveTableRef}
                                config={controlsRow}
                                data={controlsData}
                                pagination={false}
                                liveTableRender={{}}
                                tableLeftButton={<></>}
                                tablePopover={false}
                                isRowSelection={false}
                            >
                            </LiveTable>
                        </div>
                    </Card>
                </Space>
            </div>
        </>
    );
}

export default OrderDetail;
