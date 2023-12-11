const initState = {
    userName: ""
}

const userReducer = (state = initState, { type, payload }: any) => {
    switch (type) {
        case 'LOGIN':
            return { 
                ...state,
                userName: payload
            }
        default :
            return {
                ...state
            }
    }
}

export default userReducer;
