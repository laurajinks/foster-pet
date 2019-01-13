const initialState = {
    username: "",
    id: "",
    isOrg: false
};

const UPDATE_USER = "UPDATE_USER";

export const updateUser = user => {
    return {
        type: UPDATE_USER,
        payload: user
    };
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER: {
            return {
                ...state,
                username: action.payload.username,
                id: action.payload.id,
                isOrg: action.payload.isOrg
            };
        }

        default: {
            return state;
        }
    }
}

export default authReducer;
