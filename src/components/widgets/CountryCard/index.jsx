import React from 'react';
import classes from './index.module.scss'
import NameValue from "../../UI/NameValue";
import generateClassName from "../../../shared/utilities/generateClassName";
import numberWithCommas from "../../../shared/utilities/numberWithCommas";
import {Link} from "react-router-dom";

const CountryCard = ({key, country}) => {
    return (
        <Link to={`country/${country?.name}`} key={key}
              className={generateClassName(['colorBlue-3 dark:colorWhite', classes.root])}>
            <figure className={classes.image} style={{background: `url(${country?.flags?.png})`}}/>
            <div className={generateClassName(['bg-colorWhite dark:bg-colorBlue-1 p-16', classes.spec])}>
                <div className='fs-big pt-8 pb-16'>{country?.name}</div>
                <NameValue name={'Population'} value={numberWithCommas(country?.population)}/>
                <NameValue name={'Region'} value={country?.region}/>
                <NameValue name={'Capital'} value={country?.capital}/></div>
        </Link>
    );
};

export default CountryCard;