import React, { useEffect, useRef } from 'react';

export function useDidUpdateEffect(fn: Function, inputs: unknown[]) {
	const didMountRef = useRef(false);
	useEffect(() => {
		if(didMountRef.current) {
			fn();
		} else {
			didMountRef.current = true;
		}
	}, inputs)
}

