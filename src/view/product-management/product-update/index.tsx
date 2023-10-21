import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams  } from "react-router-dom";
import { Steps, Button, Checkbox, Form, Input, message } from 'antd';
import LiveForm from '@/common/components/live-form';
import ProductInfo from './components/product-info/index';
import PreferentialModel from './components/preferential-model/index';
import CommoditySpecification from './components/commodity-specification/index';
import SubjectTransfer from './components/subject-transfer/index';
import PrefrenceArea from './components/prefrence-area/index';
import ProductAttributeList from './components/product-attribute/index';
import ProductAlbum from './components/product-album/index';
import { cloneDeep, values } from 'lodash';
import { formItemFn, initialize } from './configs/index';
import { getProductInfo } from './server';
import { DataInfoType, ProductFullReductionListType } from './types';
import styles from './style/index.module.less';

function ProductUpdate() {
	// 问号传参的获取方式
	const detailedInformationRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const salesPromotionRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const productAttributeCategoryRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
	const [dataInfo, setDataInfo] = useState<DataInfoType>(initialize);
	let [searchParams, setSearchParams] = useSearchParams()
	let [current, setCurrent] = useState(0);
	const { detailedInformation, salesPromotion, productAttributeCategoryMemo } = formItemFn();
	const items = [
		{
			title: '填写商品信息'
		},
		{
			title: '填写商品促销'
		},
		{
			title: '填写商品属性'
		},
		{
			title: '选择商品关联'
		}
	];
	const StepsList = [
		(
			<Button type="primary" htmlType="submit" className={styles.button} onClick={() => nextTow(1)}>
				下一步，填写商品促销
			</Button>
		),
		(
			<div className={styles.stepsButton}>
				<Button htmlType="submit" className={styles.button} onClick={() => previousOne(0)}>
					上一步，填写商品信息
				</Button>
				<Button type="primary" htmlType="submit" className={styles.button} onClick={() => nextThree(2)}>
					下一步，填写商品属性
				</Button>
			</div>
		),
		(
			<div className={styles.stepsButton}>
				<Button htmlType="submit" className={styles.button} onClick={() => previousTwo(1)}>
					上一步，填写商品促销
				</Button>
				<Button type="primary" htmlType="submit" className={styles.button} onClick={() => nextFour(3)}>
					下一步，选择商品关联
				</Button>
			</div>
		),
		(
			<div className={styles.stepsButton}>
				<Button htmlType="submit" className={styles.button} onClick={() => previousThree(2)}>
					上一步，填写商品属性
				</Button>
				<Button type="primary" htmlType="submit" className={styles.button} onClick={() => submit()}>
					完成提交商品
				</Button>
			</div>
		)
	]
	const inlineOperate = StepsList[current];
	/* 上一页下一页开始 */
	// 第一页 => 第二页
	const nextTow = (index: number) => {
		const informationForm = detailedInformationRef.current?.getFormValue() || {}
		const info = {
			...dataInfo,
			...informationForm
		}
		setDataInfo({
			...info
		});
		update(info, index)
	}
	// 第二页 => 第一页
	const previousOne = (index: number) => {
		const infoSalesPromotion = salesPromotionRef.current?.getFormValue() || {}
		const info = {
			...dataInfo,
			...infoSalesPromotion
		}
		setDataInfo({
			...info
		});
		update(dataInfo, index)
	}
	// 第二页 => 第三页
	const nextThree = (index: number) => {
		const infoSalesPromotion = salesPromotionRef.current?.getFormValue() || {}
		const info = {
			...dataInfo,
			...infoSalesPromotion
		}
		setDataInfo({
			...info
		});
		update(info, index)
	}
	// 第三页 => 第二页
	const previousTwo = (index: number) => {
		const infoSalesPromotion = productAttributeCategoryRef.current?.getFormValue() || {}
		const info = {
			...dataInfo,
			...infoSalesPromotion
		}
		setDataInfo({
			...info
		});
		update(dataInfo, index)
	}
	// 第三页 => 第四页
	const nextFour = (index: number) => {
		const infoSalesPromotion = productAttributeCategoryRef.current?.getFormValue() || {}
		const info = {
			...dataInfo,
			...infoSalesPromotion
		}
		setDataInfo({
			...info
		});
		update(info, index)
	}
	// 第四页 => 第三页
	const previousThree = (index: number) => {
		update(dataInfo, index)
	}
	/* 上一页下一页结束 */
	const stepsItemChange = (index: number) => {
		setCurrent(index)
	}

	const submit = () => {
		console.log('提交', dataInfo);
	}
	// 返回的时候更新值
	const update = (data: DataInfoType, index: number) => {
		detailedInformation.map((item: { [key: string]: any }) => {
			item.value = data[item.name]
		})
		salesPromotion.map((item: { [key: string]: any }) => {
			item.value = data[item.name]
		})
		stepsItemChange(index);
	}
	const getForm = async (id: string) => {
		const res = await getProductInfo(id);

		setDataInfo({
			...res.data
		})
	}
	useEffect(() => {
		// 获取 id 相关的数据
		const id = searchParams.get('id') as string;
		if(id) {
			getForm(id);
		}
	}, [])
	const salesPromotionClick = (key: string, list: ProductFullReductionListType[]) => {
		const info = {
			...dataInfo,
			[key]: [...list]
		}
		setDataInfo({
			...info
		})
	}

	const productAttributeListClick = (key: string, index: number, value: string | number) => {
		const info = {
			...dataInfo,
		}
		info[key][index].value = value
		setDataInfo({
			...info
		})
	}

	const ProductAlbumListClick = (url: string) => {
		const info = {
			...dataInfo,
			pic: url
		}
		setDataInfo({
			...info
		})
	}

	// 3
	const transferInfoClick = (key: string, value: unknown[]) => {
		const info = {
			...dataInfo,
			[key]: [...value]
		}
		setDataInfo({
			...info
		})
	}
	return (
		<div className={styles.formContainer}>
			<Steps current={current} labelPlacement="vertical" items={items} />
			{
				current === 0
				&& 
				<div className={styles.formInfo}>
					<LiveForm
						ref={detailedInformationRef}
						config={detailedInformation}
						inlineOperate={inlineOperate}
						dataInfo={dataInfo}
					/>
				</div>
			}
			{
				current === 1
				&& 
				<div className={styles.formInfo}>
					<LiveForm
						ref={salesPromotionRef}
						config={salesPromotion}
						inlineOperate={inlineOperate}
						dataInfo={dataInfo}
						children={
							<Form.Item label="选择优惠方式：">
								<PreferentialModel dataInfo={dataInfo} salesPromotionClick={ salesPromotionClick } />
							</Form.Item>
						}
					/>
				</div>
			}
			{
				current === 2
				&& 
				<div className={styles.formInfo}>
					<LiveForm
						ref={productAttributeCategoryRef}
						config={productAttributeCategoryMemo}
						inlineOperate={inlineOperate}
						dataInfo={dataInfo}
						children={
							<div>
								<Form.Item label="商品规格：">
									<CommoditySpecification
										dataInfo={dataInfo}
										salesPromotionClick={ salesPromotionClick }
									></CommoditySpecification>
								</Form.Item>
								<Form.Item label="商品参数：">
									<ProductAttributeList
										dataInfo={dataInfo}
										productAttributeListClick={ productAttributeListClick }
									></ProductAttributeList>
								</Form.Item>
								<Form.Item label="商品相册：">
									<ProductAlbum 
										dataInfo={dataInfo}
										ProductAlbumListClick={ ProductAlbumListClick }
									></ProductAlbum>
								</Form.Item>
								<Form.Item label="商品详情：">
									正在开发中...
								</Form.Item>
							</div>
						}
					/>
				</div>
			}
			{
				current === 3
				&& 
				<div className={styles.formInfo}>
					<LiveForm
						config={[]}
						inlineOperate={inlineOperate}
						dataInfo={dataInfo}
						children={
							<div>
								<Form.Item label="关联专题：">
									<SubjectTransfer
										dataInfo={dataInfo}
										salesPromotionClick={ transferInfoClick }
									></SubjectTransfer>
								</Form.Item>
								<Form.Item label="关联优选：">
									<PrefrenceArea
										dataInfo={dataInfo}
										salesPromotionClick={ transferInfoClick }
									></PrefrenceArea>
								</Form.Item>
							</div>
						}
					/>
					
				</div>
			}
		</div>
	);
}

export default ProductUpdate;
