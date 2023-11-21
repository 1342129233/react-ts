import React, { useState, useEffect, Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { message } from 'antd';
import LiveTable from '@/common/components/live-table/index';
import TheDrawer from '@/common/components/the-drawer/index';
import StandardPage from '@/common/components/standard-page/index';
import { usePage, PageType } from '@/common/hooks/usePage';
import { tableConfig, standardPageModel } from './configs';
import { CouponDataType } from './types';
import { couponId, couponHistoryList } from './server';

function CouponHistory(props: PropsType, ref: Ref<unknown>) {
    const { id } = props;
    const { basicsRows, effectiveRows } = tableConfig();
    const { rows } = standardPageModel();
    const standardPageRef = useRef<HTMLDivElement & { select: Function, tableSelectedRowKeys: Function }>();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [basicsData, setBasicsData] = useState<CouponDataType[]>([]);
    const [effectiveData, setEffectiveData] = useState<CouponDataType[]>([]);
    
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    const getCouponId = async () => {
        try {
			const res = await couponId(id);
            setBasicsData([
                { ...res.data }
            ])
            setEffectiveData([
                { ...res.data }
            ])
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    const formateSearchParams = (params: Record<string, unknown>) => {
        return {
            ...params,
            couponId: id
        }
    }
    
    useEffect(() => {
        if(id && openDrawer) {
            getCouponId()
        }
    }, [openDrawer]);
    return <TheDrawer
        title="优惠券领取详情"
        open={openDrawer}
        onOpenClose={(value) => setOpenDrawer(value)}
        onSave={() => setOpenDrawer(false)}
    >
        <LiveTable
            config={basicsRows}
            data={basicsData}
            pagination={false}
            tablePopover={false}
            isRowSelection={false}
            tableLeftButton={<></>}
        />
        <LiveTable
            config={effectiveRows}
            data={effectiveData}
            pagination={false}
            tablePopover={false}
            isRowSelection={false}
            tableLeftButton={<></>}
        />
        <div className="mgt10"></div>
        <StandardPage
            ref={standardPageRef}
            config={{
                rows: rows,
                fetchConfig: couponHistoryList,
                formateSearchParams: formateSearchParams
            }}
            tableLeftButton={<></>}
            tablePopover={false}
            isRowSelection={false}
            formName="coupon-history"
        ></StandardPage>
    </TheDrawer>
}

interface PropsType {
    id: number;
}

export default forwardRef<HTMLDivElement, PropsType>(CouponHistory);
