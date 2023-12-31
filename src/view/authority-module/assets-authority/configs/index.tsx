import React, { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { Button, Space, Popconfirm } from 'antd';
import { EffectJsonFormConfig, SelectOptions } from '@/common/components/live-search/types/index';
import { resourceCategory } from '@/common/public-fetch/resourceCategory';
import { DataType } from '../types';

export function standardPageModel(params: { handleEdit: (value: DataType) => void, handleDelete: (value: number) => void } ) {
    const { handleEdit, handleDelete } = params;
    const [options, setOptions] = useState<SelectOptions[]>([]);
    const getResourceCategory = async () => {
        const res = await resourceCategory();
        const list: SelectOptions[] = []
        res.data.forEach(item => {
            list.push({
                value: item.id,
                label: item.name
            });
            setOptions([...list]);
        });
    }
    useEffect(() => {
        getResourceCategory()
    }, [])
    
    const rows = [
        {
            key: 'nameKeyword',
            value: '',
            label: '资源名称:',
            placeholder: '请输入资源名称',
            search: {
                type: 'input',
            }
        },
        {
            key: 'name',
            value: '',
            label: '',
            placeholder: '请输入资源名称',
            table: {
                label: '资源名称'
            }
        },
        {
            key: 'urlKeyword',
            value: '',
            label: '资源路径:',
            placeholder: '请输入资源路径',
            search: {
                type: 'input',
            }
        },
        {
            key: 'url',
            value: '',
            label: '',
            placeholder: '请输入资源名称',
            table: {
                label: '资源路径'
            }
        },
        {
            key: 'categoryId',
            value: '',
            label: '资源分类:',
            placeholder: '全部',
            search: {
                type: 'select',
                options: options
            }
        },
        {
            key: 'description',
            value: '',
            label: '描述',
            placeholder: '',
            table: {}
        },
        {
            key: 'createTime',
            value: '',
            label: '添加时间',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    const createTime = dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                    return <div>{ createTime }</div>
                }
            }
        },
        {
            key: 'config',
            value: '',
            label: '操作',
            placeholder: '',
            table: {
                render: (_: DataType, record: DataType) => {
                    return <Space size={0}>
                        <Button
                            type="link"
                            onClick={() => { handleEdit(record) }}
                        >
                            编辑
                        </Button>
                        <Popconfirm title="请确认删除?" onConfirm={() => handleDelete(record.id!)}>
                            <Button type="link">
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                }
            }
        }
    ] as EffectJsonFormConfig[];

    const memoizedValue = useMemo(() => {
        return rows
      }, [options]);
      
    return {
        rows: memoizedValue,
        options
    }
}

