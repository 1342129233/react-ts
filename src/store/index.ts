import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga';
import userReducer from './reducers/userReducer';

// 通过调用 createSagaMiddlewar 创建 sagaMiddleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware,
});

sagaMiddleware.run(rootSaga)

export default store


