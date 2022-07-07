import React, {useCallback, useState} from 'react';
import generateClassName from "../../../shared/utilities/generateClassName";
import classes from './index.module.scss'
import debounce from "../../../shared/utilities/debounce";

const SearchInput = ({onSearchCompleted}) => {
    const [value, setValue] = useState('');

    const debouncedChange = useCallback(debounce((e) => onSearchCompleted?.(e.target.value), 500), [])

    const handleInputChange = e => {
        setValue(e.target.value)
        debouncedChange(e)
    }

    const handleOnClickReset = () => {
        setValue('')
        onSearchCompleted('')
    }

    return (
        <div
            className={generateClassName(['bg-colorWhite dark:bg-colorBlue-1 radius-small shadow-base px-24 d-flex flex-y-center', classes.root])}>
            <i className='bx bx-search fs-medium mr-16'/>
            <input
                id='query'
                name='query'
                type="text"
                placeholder='Search for a country...'
                value={value}
                onChange={handleInputChange}
            />
            {!!value && <i className={'bx bx-x fs-big ml-4 colorRed cursor-pointer'} onClick={handleOnClickReset}/>}
        </div>
    );
};

export default SearchInput;