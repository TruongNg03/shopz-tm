import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
    user: localStorage.getItem('shopz-tm-user') ? JSON.parse(localStorage.getItem('shopz-tm-user')) : null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case 'REGISTER_START':
            return {
                user: null,
                loading: true,
                error: null,
            };
        case 'REGISTER_SUCCESS':
            return {
                user: null,
                loading: false,
                error: null,
            };
        case 'REGISTER_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('shopz-tm-user', JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
