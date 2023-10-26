import React, { useState, useEffect } from 'react';
export { statusMap } from './options';
import { statusMap } from './options';
import { convertMap } from '@/common/utils';
import UploadImg from '@/common/components/upload-img/index';

export const info = {
    bigPic: "",
    brandStory: "",
    factoryStatus: 0,
    firstLetter: "",
    id: "",
    logo: "",
    name: "",
    productCommentCount: 0,
    productCount: 0,
    showStatus: 0,
    sort: 0
}

export function formItemFn() {
    const config = [
        {
            name: 'name',
            label: '品牌名称:',
            value: '',
            tag: 'input',
            placeholder: '',
            rules: [{ required: true, message: '请输入品牌名称' }]
        },
        {
            name: 'firstLetter',
            label: '品牌首字母:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'logo',
            label: '品牌LOGO:',
            value: '',
            tag: 'img',
            placeholder: '',
            component: (dataInfo: Record<string, string>, infoValue: Function) => {
                const [imageUrl, setImageUrl] = useState<string>(dataInfo.logo);
                const handleChange = (img: string) => {
                    infoValue("logo", img);
                    setImageUrl(img);
                }
                useEffect(() => {
                    setImageUrl(dataInfo.logo)
                }, [dataInfo.logo])
                return <UploadImg 
                    action='/api/app/picture' 
                    url={imageUrl}
                    imgChange={handleChange}
                ></UploadImg>
            }
        },
        {
            name: 'bigPic',
            label: '品牌专属大图:',
            value: '',
            tag: 'img',
            placeholder: '',
            component: (dataInfo: Record<string, string>, infoValue: Function) => {
                const [imageUrl, setImageUrl] = useState<string>(dataInfo.bigPic);
                const handleChange = (img: string) => {
                    infoValue("bigPic", img);
                    setImageUrl(img);
                }
                useEffect(() => {
                    setImageUrl(dataInfo.bigPic)
                }, [dataInfo.bigPic])
                return <UploadImg 
                    action='/api/app/picture' 
                    url={imageUrl}
                    imgChange={handleChange}
                ></UploadImg>
            }
        },
        {
            name: 'brandStory',
            label: '品牌故事:',
            value: '',
            tag: 'textArea',
            placeholder: ''
        },
        {
            name: 'sort',
            label: '排序:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'showStatus',
            label: '是否显示:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(statusMap)
            }
        },
        {
            name: 'factoryStatus',
            label: '品牌制造商:',
            value: '',
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(statusMap)
            }
        }
    ];

    return {
        config
    };
}
