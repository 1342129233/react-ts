import React from 'react';

function useSessionStorage() {
	const set = (key: string, val: unknown) => {
		const value = JSON.stringify(val)
		window.sessionStorage.setItem(key, value);
	}
	const get = (key: string) => {
		const value = window.sessionStorage.getItem(key) || '';
		return JSON.parse(value);
	}
	const remove = (key: string) => {
		window.sessionStorage.removeItem(key);
	}
	const clear = () => {
		window.sessionStorage.clear();
	}
	return {
		set,
		get,
		remove,
		clear
	};
}

export default useSessionStorage;
