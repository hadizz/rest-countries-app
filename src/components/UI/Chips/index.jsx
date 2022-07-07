import React from 'react';

const Chips = ({text, onClick}) => {
    return (
        <span onClick={onClick} className='p-8 shadow-base dark:bg-colorBlue-1 bg-colorWhite radius-small m-4 cursor-pointer'>
            {text}
        </span>
    );
};

export default Chips;