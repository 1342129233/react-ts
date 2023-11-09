export function isDef<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null;
}

export function assertDef<T>(
    v: T,
    message?: string
): asserts v is NonNullable<T> {
    if(!isDef(v)) {
        throw new Error(message ?? 'Must not be undefined');
    }
}