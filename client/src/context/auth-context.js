import React from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext({
    authState: { 
        token: ""
    },
    setAuthState: () => {},
    isUserAuthenticated: () => !!localStorage.getItem('user')
});

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    
    const [authState, setAuthState] = React.useState({
        token: "",
    });

    const setUserAuthInfo = ({ data }) => {
        const token = localStorage.setItem("token", data.data);

        setAuthState({
            token,
        });
    };

    // will always return a boolean value
    const isUserAuthenticated = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        // Check if token exists in local storage
        if(user)
            return true;
        else
            return !!authState.token;
    }


    return (
        <Provider
            value={{
            authState,
            setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
            isUserAuthenticated,
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };