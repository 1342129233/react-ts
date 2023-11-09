import React, { useState, useEffect, useMemo } from 'react';
import { useFetchModel } from '@/common/hooks/useFetchModel';
import { isDef } from '@/common/utils';
import { get } from "lodash";

export function useTabFetch<T extends Record<string, any>, P, K extends string, U = Array<unknown>>(params: {
    url: string,
    method: 'get'|'post',
    key: string | string[],
    pageTotalKey?: string,
    transformListFunc?: (params: T[K])=> U
}) {
    if(isDef(params)) {
        const { method, url, key, pageTotalKey = 'total', transformListFunc } = params;
        const { data, loading, error, mutate } = useFetchModel<T, P>(url, {
            method: method,
            immediate: false
        });

        // totalSize
        const totalSize = useMemo(() => {
            return Number(get(data, pageTotalKey) ?? 0);
        }, [data])

        // 不需要转换的值
        const fetchList = useMemo(() => {
            if(typeof key === 'string') {
                return get(data, key) as T[K];
            }
            const map: Record<string, unknown> = {};
            (key as string[]).forEach((item: string) => {
                map[item] = data?.[item] as T[K];
            });
            return map;
        }, [data])

        // 需要转换的值
        const transformList = useMemo(() => {
            return transformListFunc?.(fetchList as T[K]);
        }, [fetchList])

        const list = useMemo(() => {
            return transformList ?? fetchList;
        }, [transformList, fetchList])

        return {
            mutate,
            totalSize,
            list,
            transformList,
            fetchList
        }
    }
}

