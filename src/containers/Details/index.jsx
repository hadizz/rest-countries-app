import React, {useEffect, useState} from 'react';
import classes from './index.module.scss'
import NameValue from "../../components/UI/NameValue";
import {getCountryByCode, getCountryByName} from "../../api/methods";
import Chips from "../../components/UI/Chips";
import {useNavigate, useParams} from "react-router-dom";
import useIsMounted from "../../core/hooks/useIsMounted";
import numberWithCommas from "../../shared/utilities/numberWithCommas";
import generateClassName from "../../shared/utilities/generateClassName";
import {appBaseUrl} from "../../routes";

const DetailsPage = () => {
    const isMounted = useIsMounted();
    const navigate = useNavigate();
    let {id: countryName} = useParams();
    const [country, setCountry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [borders, setBorders] = useState([]);
    console.log(borders)
    const [isLoadingBorders, setIsLoadingBorders] = useState(true)

    const getBorders = (arr) => {
        let promises = arr?.map(i => getCountryByCode(i, {fields: 'name'}))
        Promise.all(promises).then(res => {
            isMounted && setBorders(res)
        }).finally(() => isMounted && setIsLoadingBorders(false))
    }

    useEffect(() => {
        document.title = 'Where in the world? | ' + countryName
        setIsLoading(true)
        setIsLoadingBorders(true)
        if (countryName) {
            getCountryByName(countryName, {fullText: true})
                .then(res => {
                    isMounted && setCountry(res?.[0] ?? {})
                    isMounted && getBorders(res?.[0]?.borders ?? [])
                }).finally(() => isMounted && setIsLoading(false))
        }
    }, [countryName, isMounted])

    const backButton = (
        <button
            onClick={() => navigate(-1)}
            className={generateClassName([classes.back, 'bg-colorWhite dark:bg-colorBlue-1 dark:colorWhite cursor-pointer'])}
        >
            <i className='bx bx-arrow-back mr-4 fs-base'/>Back
        </button>)

    if (isLoading) return (
        <>
            {backButton}
            <div className='d-flex flex-over-center m-24'><i className='bx bx-loader-alt bx-spin fs-extra'/></div>
        </>
    )

    if (!country) return (
        <>
            {backButton}
            <span>There is no data to show!</span>
        </>
    )

    return (
        <>
            {backButton}
            <div className={classes.root}>
                <div className={classes.flag}>
                    <img src={country?.flags.svg} alt={country?.name}/>
                </div>
                <section className={classes.details}>
                    <h1>{country?.name}</h1>
                    <div className={classes.pairs}>
                        <div>
                            <NameValue padding name={'Native Name'} value={country?.nativeName}/>
                            <NameValue padding name={'Population'} value={numberWithCommas(country?.population)}/>
                            <NameValue padding name={'Region'} value={country?.region}/>
                            <NameValue padding name={'Sub Region'} value={country?.subregion}/>
                            <NameValue padding name={'Capital'} value={country?.capital}/>
                        </div>
                        <div>
                            <NameValue padding name={'Top Level Domain'} value={country?.topLevelDomain?.join(', ')}/>
                            <NameValue padding name={'Currencies'}
                                       value={country?.currencies?.map(i => i.name)?.join(', ')}/>
                            <NameValue padding name={'Languages'}
                                       value={country?.languages?.map(i => i?.name)?.join(', ')}/>
                        </div>
                    </div>

                    {isLoadingBorders ?
                        <i className='bx bx-loader-alt bx-spin fs-extra'/>
                        :
                        <div className={classes.borders}>
                            <span className={classes.title}>Border Countries:</span>
                            <span className={classes.items}>{
                                borders?.length === 0 ? 'None!' :
                                    borders?.map(i =>
                                        <Chips
                                            text={i?.name}
                                            onClick={() => {
                                                setIsLoading(true)
                                                setIsLoadingBorders(true)
                                                navigate('country/' + i?.name)
                                            }}
                                        />
                                    )
                            }
                        </span>
                        </div>
                    }
                </section>
            </div>
        </>
    );
};

export default DetailsPage;