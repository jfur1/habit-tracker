import { createContext, useState, useEffect } from 'react'

const DarkModeContext = createContext();

const DarkModeProvider = (props) => {
    const [darkMode, setDarkMode] = useState(
        (typeof(window) !== 'undefined' && window.localStorage) 
            ? JSON.parse(localStorage.getItem('darkMode'))
            : false
        );

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

    return (
        <div>
            <DarkModeContext.Provider
                value={{ 
                    darkMode, 
                    toggleDarkMode
                }}
            >
                {props.children}
            </DarkModeContext.Provider>
        </div>
    )
}

export { DarkModeContext, DarkModeProvider }