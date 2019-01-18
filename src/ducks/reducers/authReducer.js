import axios from "axios";

const initialState = {
    username: "",
    id: "",
    isOrg: false
};

const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";

export const updateUser = (username, id, isOrg) => {
    return {
        type: UPDATE_USER,
        payload: username,
        id,
        isOrg
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
