import React, { useState, useEffect, useMemo, useRef } from 'react';
import { isDef } from '@/common/utils';

function setLoading(loading: boolean, timeout?: number) {
    if(isDef(timeout)) {
        setTimeout(() => {
            loading = false;
        }, timeout);
    } else {
        loading = false;
    }
}
/**
 *  loading state auto flow duration req
 * @param req
 * @param timeout
 * @returns
 */
export function useLoading(observer: any, timeout?: number): [boolean, (...args: any[])=> Promise<unknown> | void] {
    // const loading = useRef(false)
    let loading = false;

    if(typeof observer.then === 'function') {
        loading = true;

        const watchFn = () => {
            useEffect(() => {
                observer
                    .then(() => {
                        setLoading(loading, timeout);
                    })
                    .catch(() => {
                        loading = false
                    });
            }, [observer])
        };

        return [loading, watchFn];
    }

    const watchFn = (...args: any[]) => {
        loading = true;
        return Promise.resolve(observer(...args))
            .then(() => {
                setLoading(loading, timeout);
            })
            .catch(() => {
                loading = false;
            });
    };
    return [loading, watchFn];
}
