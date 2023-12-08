import React, { useEffect, useRef } from "react";

export function useWatch<T>(deps: T, handler: (next: T, prev: T) => void, immediate = false) {
    let nextRef = useRef<T>();
    const isImmediate = useRef(true);
  
    useEffect(() => {
        if (isImmediate.current) {
            handler(nextRef.current as T, deps);
        } else {
            isImmediate.current = true;
        }
        return () => {
            nextRef.current = deps;
        };
    }, [deps]);
}

