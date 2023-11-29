import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn'
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // HashRouter BrowserRouter

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Suspense>
        <Router>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </Router>
    </Suspense>
);
