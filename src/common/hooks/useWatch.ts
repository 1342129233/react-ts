import React, { useEffect, useRef } from "react";

export function useWatch<T>(deps: T, handler: (next: T, prev: T) => void, immediate = false) {
    let prevRef = useRef<T>();
    const isImmediate = useRef(true);
  
    useEffect(() => {
        if (isImmediate.current) {
            handler(deps, prevRef.current as T);
        } else {
            isImmediate.current = true;
        }
        return () => {
            prevRef.current = deps;
        };
    }, [deps]);
}

