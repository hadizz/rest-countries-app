import React from "react";
import {useAppContext} from "../../../core/context";

const Header = () => {
    const {isDarkMode, changeDarkMode} = useAppContext()
    return (
        <header className='container bg-colorWhite shadow-base dark:bg-colorBlue-1 d-flex flex-x-between flex-y-center'>
            <a href='/' className='fw-600 fs-base cursor-pointer reset-decoration dark:colorWhite colorBlue-3'>Where in
                the world?</a>
            <div aria-label='Dark Mode Button' className='d-flex flex-over-center cursor-pointer'
                 onClick={changeDarkMode}>
                <i className={`bx bx${isDarkMode ? 's' : ''}-moon fs-medium`}/>
                <span className='p-8 fs-small'>Dark Mode</span>
            </div>
        </header>
    );
};

export default Header;