import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn'
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // HashRouter BrowserRouter
import store from './store'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Suspense>
        <Router>
            <ConfigProvider locale={zhCN}>
                <Provider store={store}> 
                    <App />
                </Provider>
            </ConfigProvider>
        </Router>
    </Suspense>
);
