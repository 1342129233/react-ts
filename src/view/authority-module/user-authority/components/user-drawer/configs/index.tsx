import { convertMap } from '@/common/utils';

export const info = {
    createTime: "",
    email: "",
    icon: "",
    loginTime: "",
    nickName: "",
    note:"",
    password: "",
    status: 0,
    username: ''
}

export function formItemFn() {
    const config = [
        {
            name: 'username',
            label: '账号:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'nickName',
            label: '姓名:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'email',
            label: '邮箱:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'password',
            label: '密码:',
            value: '',
            tag: 'input',
            placeholder: ''
        },
        {
            name: 'description',
            label: '描述:',
            value: '',
            tag: 'textArea',
            placeholder: ''
        },
        {
            name: 'status',
            label: '是否启用:',
            value: 0,
            tag: 'radio',
            placeholder: '',
            search: {
                options: convertMap(enableMap)
            }
        }
    ]

    return {
        config
    }
}

export enum enableEnum {
    NO = 0,
    YES = 1
}

export const enableMap: {[key in enableEnum]: string} = {
    [enableEnum.NO]: '否',
    [enableEnum.YES]: '是'
}
