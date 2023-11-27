import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setCookie } from '@/common/utils';
import { login } from '@/common/axios/login';

import styles from './style/index.module.less';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: FieldType) => {
        const params = {
            username: values.username || '',
            password: values.password || ''
        }
        try {
            const res = await login(params);
            const { token, tokenHead } = res.data;
            const value = tokenHead + ' ' + token;
            setCookie('loginToken', value)
            navigate('/home');
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    };
    
    const onFinishFailed = (errorInfo: any) => {
        message.error('用户名或密码错误')
    };
    useEffect(() => {
        form.setFieldsValue({
            username: 'admin',
            password: 'macro123'
        })
    }, [])
    return (
        <div>
            <div className={styles.loginFormLayout}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="用户:"
                        name="username"
                        rules={[{ required: true, message: '请输入正确的用户名' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码:"
                        name="password"
                        rules={[{ required: true, message: '请输入正确的密码' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>《已阅读并认同规则》</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <img src={process.env.PUBLIC_URL + '/images/login_center_bg.png'} className={styles.loginCenterLayout} />
            </div>
        </div>
    )
};

export default Login;