import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Modal } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import styles from './style/index.module.less';

function TheDrawer(props: Props) {
	const { 
		size = 'large', 
		title = '', 
		open = false, 
		children = '',
		theDrawerStyle = {} ,
		cancelText = '取消',
		saveText = '确认',
		disabled = false,
		loading = false,
		showFooter = null,
		onOpenClose, 
		onSave,
	} = props;
	
	const onClose = () => {
		onOpenClose(false)
	};
	const save = () => {
		onSave ? onSave() : null;
	}
	// 取消 
	const cancel = () => {
		const confirm = Modal.confirm;
		confirm({
			title: '请确认',
			okText: '确认',
			cancelText: '取消',
			content: '确定关闭该弹窗吗',
			onOk: () => {
				onOpenClose(false);
			}
		})
	}

	return (
		<Drawer 
			title={title} 
			placement="right" 
			size={size}
			onClose={onClose} 
			open={open}
			destroyOnClose={true}
			className={styles.theDrawer}
			style={{ paddingBottom: !showFooter ? '80px' : '20px' }}
		>
			
			{ children }
			<div
				className={styles.theDrawerFooter}
				style={{ height: !showFooter ? '80px' : '0px', ...theDrawerStyle }}
			>
				{ 
					!showFooter 
					?
					<>
						<Button
							className='theDrawerFooterButton'
							disabled={disabled}
							onClick={() => cancel()}
						>
							{ cancelText }
						</Button>
						<Button 
							className='theDrawerFooterButton' 
							type="primary" 
							disabled={disabled}
							loading={loading}
							onClick={() => save()}
						>
							{ saveText }
						</Button>
					</>
					:
					showFooter
				}
			</div>
		</Drawer>
	);
}

interface Props {
	open: boolean;
	size?: DrawerProps['size'];
	title?: string;
	showFooter?: any;
	theDrawerStyle?: Record<string, unknown>,
	onOpenClose: (value: boolean) => void;
	onSave?: () => void
	children: any
	cancelText?: string;
	saveText?: string;
	disabled?: boolean;
	loading?: boolean;
}

export default TheDrawer;
