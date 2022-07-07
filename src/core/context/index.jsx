import React, {useMemo, useContext, useState, useEffect, useCallback} from 'react';
import {addItemToStorage, getItemFromStorage} from "../../shared/utilities/dataStorage";

const THEME_STORAGE_KEY = 'theme';
const THEME_DARK_KEY = 'dark'
const THEME_LIGHT_KEY = 'light'

export const AppContext = React.createContext();

const changeTheme = (matchesDark) => {
    document.body.classList?.[matchesDark ? 'add' : 'remove']?.(THEME_DARK_KEY)
    addItemToStorage(THEME_STORAGE_KEY, matchesDark ? THEME_DARK_KEY : THEME_LIGHT_KEY)
};

const AppContextProvider = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(getItemFromStorage(THEME_STORAGE_KEY) === THEME_DARK_KEY);

    const changeDarkMode = useCallback(() => setIsDarkMode(!isDarkMode), [isDarkMode])

    useEffect(() => {
        const handleOnChangeColorScheme = event => {
            let matchesDark = event.matches;
            setIsDarkMode(matchesDark)
        }
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        matchMedia.addEventListener('change', handleOnChangeColorScheme);
        return () => matchMedia.removeEventListener('change', handleOnChangeColorScheme)
    }, [])

    useEffect(() => {
        // listen for changing when click button or system preferences change
        changeTheme(isDarkMode)
    }, [isDarkMode])

    const value = useMemo(() => ({isDarkMode, changeDarkMode}), [isDarkMode, changeDarkMode]);

    return <AppContext.Provider value={value} {...props} />;
};

const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error(`useAppContext must be used within a AppContextProvider`);
    }
    return context;
};

export {useAppContext, AppContextProvider};
