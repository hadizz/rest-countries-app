import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useState} from 'react';
import classes from './index.module.scss'
import generateClassName from "../../../shared/utilities/generateClassName";

const Select = ({label, data, onChange, onReset}, ref) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelected('')
        }
    }))

    const renderItems = useMemo(() =>
            data?.map((item, idx) => <li key={idx} id={item}>{item}</li>),
        [data])

    const handleClickButton = useCallback(() => setOpen(!open), [open])

    const handleOnChange = e => {
        const newValue = e.target.id
        setSelected(newValue)
        setOpen(false)
        onChange?.(newValue);
    }

    const handleOnClickReset = (e) => {
        // prevent calling upper onclick
        e.stopPropagation()
        setSelected('')
        setOpen(false)
        onReset?.();
    }

    return (
        <div className={classes.root}>
            <div
                aria-label={label}
                className={generateClassName([
                    'bg-colorWhite dark:bg-colorBlue-1 radius-small shadow-base d-flex flex-x-between flex-y-center cursor-pointer',
                    classes.button
                ])}
                onClick={handleClickButton}
            >
                <div className='d-flex flex-over-center'>
                    <div>{selected || label}</div>
                    {selected && <i className={'bx bx-x fs-big ml-4 colorRed'} onClick={handleOnClickReset}/>}
                </div>
                <i className={`bx bx-chevron-${open ? 'up' : 'down'} fs-big`}/>
            </div>
            {open && (
                <ul onClick={handleOnChange}
                    className={generateClassName(['bg-colorWhite dark:bg-colorBlue-1 radius-small shadow-base', classes.list])}>
                    {renderItems}
                </ul>)}
        </div>
    );
};

export default forwardRef(Select);