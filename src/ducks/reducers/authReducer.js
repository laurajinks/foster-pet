import axios from "axios";

const initialState = {
    user: {}
};

const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";

export const updateUser = user => {
    return {
        type: UPDATE_USER,
        payload: user
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios("/api/logout")
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

        case LOGOUT: {
            return {
                ...state,
                user: {}
            };
        }

        default: {
            return state;
        }
    }
}

export default authReducer;
