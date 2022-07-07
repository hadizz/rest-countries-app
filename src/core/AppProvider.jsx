import ErrorBoundary from "./ErrorBoundary";
import {AppContextProvider} from "./context";
import Header from "../components/widgets/Header";
import React from "react";

const AppProvider = ({children}) => {
    return (
        <ErrorBoundary>
            <AppContextProvider>
                <Header/>
                <main className='container'>
                    {children}
                </main>
            </AppContextProvider>
        </ErrorBoundary>
    );
};

export default AppProvider;