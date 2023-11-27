import Cookies from 'js-cookie'

// const TokenKey = 'loginToken'

export function getCookie(name: string) {
  return Cookies.get(name)
}

export function setCookie(name: string, token: string) {
	return Cookies.set(name, token, {
		expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 7 )   //设置cookie有效期为1h，对应后端有效期
	})
}

export function removeCookie(name: string) {
    return Cookies.remove(name)
}

