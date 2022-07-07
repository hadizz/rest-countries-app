import React from 'react';
import generateClassName from "../../../shared/utilities/generateClassName";

const NameValue = ({name, value, padding}) => {
    return (
        <div className={generateClassName([padding && 'py-8'])}>
            <span className='fw-600'>{name}: </span>
            <span className='fw-300 dark:colorGrey-2'>{value}</span>
        </div>
    );
};

export default NameValue;