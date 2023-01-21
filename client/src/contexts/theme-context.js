import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './auth-context.js'
import Axios from 'axios'

const DarkModeContext = createContext();
const { Provider } = DarkModeContext

export const DarkModeProvider = ({ children }) => {

    const { user } = useAuth();

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);
    
    const toggleDarkMode = () => {
        localStorage.setItem("darkMode", JSON.stringify(!darkMode));
        setDarkMode(!darkMode);
    }

    const setTheme = (userPreference) => {
        console.log("userPreference:", userPreference)
        localStorage.setItem("darkMode", userPreference);
        setDarkMode(userPreference);
    }

    const saveThemePreference = async (darkMode, userData) => {
        // darkMode: boolean
        console.log("savePreference API received: ", darkMode)
        console.log(userData)
        const headers = {
            "Authorization": "Bearer " + userData.token,
            "Content-Type": 'application/json',
            "id": userData.user_id
        };
        // console.log('headers:', headers)
        try {
            const res = await Axios.post(process.env.API_URL + 'theme', {darkMode}, {headers});
            console.log(res)
            return res;
        } catch (error) {
            alert("Error saving preference. Please try again!: ");
            return;
        }
    }

    return (
        <Provider
            value={{ 
                darkMode, 
                setTheme,
                toggleDarkMode,
                saveThemePreference
            }}
        >
            {children}
        </Provider>
    )
}

export const useThemeContext = () => useContext(DarkModeContext);