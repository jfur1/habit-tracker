import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";

const DataContext = React.createContext({
    habits: [],

});

const { Provider } = DataContext;

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    return (
        <Provider
            value={{
                userData,
                loading,
                setUserData,
            }}
        >
            {children}
        </Provider>
    );
}