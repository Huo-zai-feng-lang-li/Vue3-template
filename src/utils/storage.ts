/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	// 设置永久缓存
	set(key: string, val: any) {
		window.localStorage.setItem(key, JSON.stringify(val));
	},
	// 获取永久缓存
	get(key: string) {
		const json = <string>window.localStorage.getItem(key);
		// !null为true
		if (!json) return null;
		// 这里是防止 在本地直接修改了localStorage的值，不经过上面转换，导致JSON.parse报错
		return JSON.parse(JSON.stringify(json));
	},
	// 移除永久缓存
	remove(key: string) {
		window.localStorage.removeItem(key);
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: string, val: any) {
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {
		const json = <string>window.sessionStorage.getItem(key);
		if (!json) return null;
		return JSON.parse(JSON.stringify(json));
	},
	// 移除临时缓存
	remove(key: string) {
		window.sessionStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {
		window.sessionStorage.clear();
	},
};
/**
 * 获取本地的key集合
 * @method getLocalKey
 * @param { string }  key - 要获取的key值
 * @param { object }  type - 从那里获取 localStorage、sessionStorage
 * @description 传入key值，返回匹配的key,不传返回全部key数组
 * @returns { string } 返回匹配的key或者全部key数组
 * @example
 * > getLocalKey('token') // 返回local token
 * > getLocalKey('token', localStorage) // 返回local token
 * > getLocalKey('token', sessionStorage) // 返回session token
 * > getLocalKey() // 返回localStorage全部key数组
 * > getLocalKey(undefined, sessionStorage) // 返回sessionStorage全部key数组
 * @author zk
 * @createDate 2023/08/17 13:58:19
 * @lastFixDate 2023/08/17 13:58:19
 */
export const getLocalKey = (
	key?: string,
	type: object = localStorage
): string[] | string | undefined => {
	const keys = Object.keys(type);
	if (!key) return keys;
	if (keys.length > 0) {
		for (let i = 0; i < keys.length; i++) {
			const item = keys[i];
			if (item.indexOf(key) > -1) {
				return item;
			}
		}
	}
	return undefined;
};
