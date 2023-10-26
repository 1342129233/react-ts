import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

// 上传图片
function UploadImg(props: PropsType) {
	const { size = 10, type = [], action, name = '', url, imgChange } = props;
	const [loading, setLoading] = useState(false);

	const beforeUpload = (file: RcFile) => {
		if(type.length === 0) {
			return;
		}
		const isJpgOrPng = type.includes(file.type); // file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
		  message.error(`您只能上传${type}JPG/PNG文件!`);
		}
		const isLt2M = file.size / 1024 / 1024 < size;
		if (!isLt2M) {
		  message.error(`图片必须小于${size}MB!`);
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		const moke  = setTimeout(() => {
			imgChange("http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221108/xiaomi_banner_01.png");
		}, 1000);
		// if (info.file.status === 'uploading') {
		// 	setLoading(true);
		// 	return;
		// }
		// if (info.file.status === 'done') {
		// 	// 获取url
		// 	getBase64(info.file.originFileObj as RcFile, (url) => {
		// 		setLoading(false);
		// 		imgChange(url);
		// 	});
		// }
	};

	const uploadButton = (
		<div>
		  {loading ? <LoadingOutlined /> : <PlusOutlined />}
		  <div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<>
			<Upload
				name={ name }
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action={ action }
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{url ? <img src={url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
		</>
	);
}

interface PropsType {
	size?: number;
	type?: string[];
	action: string;
	name?: string;
	url?: string;
	imgChange: Function
}

export default UploadImg;
