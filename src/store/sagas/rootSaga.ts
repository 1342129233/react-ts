import { all, call, put, takeLatest } from 'redux-saga/effects';

function* loginUser(action: any): any {
    try {
        yield put({ type: 'LOGIN', payload: '已经登录请体验！' });
    } catch (error: any) {}
}

function* watchLoginUserRequest() {
    yield takeLatest("TO_LOGIN", loginUser);
}

export default function* rootSaga() {
    yield all([watchLoginUserRequest()]);
}

