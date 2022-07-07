import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getCountries, getCountryByName} from "../../api/methods";
import SearchInput from "../../components/widgets/SearchInput";
import CountryCard from "../../components/widgets/CountryCard";
import classes from './index.module.scss'
import useIsMounted from "../../core/hooks/useIsMounted";
import CountryFilterData from "../../shared/constants/countryFilterData";
import Select from "../../components/UI/Select";

const safetyArray = arr => arr && Array.isArray(arr) ? arr : []

const HomePage = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [searchedCountries, setSearchedCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(true);

    const regionRef = useRef();
    const isMounted = useIsMounted();

    const items = isFiltering ? filteredCountries : isSearching ? searchedCountries : allCountries;

    useEffect(() => {
        getCountries().then(res => {
            isMounted && setAllCountries(safetyArray(res));
        })
            .finally(() => isMounted && setLoading(false))
    }, [isMounted]);

    const handleOnSearchCompleted = useCallback(query => {
        setIsSearching(true);
        setIsFiltering(false);
        regionRef?.current?.reset();
        if (!query) {
            setIsSearching(false);
        } else {
            setIsSearching(true);
            setLoading(true);
            getCountryByName(query).then(res => isMounted && setSearchedCountries(safetyArray(res))).finally(() => isMounted && setLoading(false))
        }
    }, [isMounted]);

    const handleOnChangeRegion = useCallback(region => {
        setIsFiltering(true);
        const whatToSearch = isSearching ? searchedCountries : allCountries;
        setFilteredCountries(whatToSearch?.filter(i => i?.region?.toLowerCase() === region?.toLowerCase()));
    }, [allCountries, isSearching, searchedCountries]);

    const handleOnResetRegion = useCallback(() => {
        setIsFiltering(false);
        setFilteredCountries([]);
    }, []);

    return (
        <>
            <div className={classes.filterBar}>
                <SearchInput
                    onSearchCompleted={v => {
                        handleOnSearchCompleted(v)
                    }}
                />
                <Select
                    ref={regionRef}
                    label='Filter By Region'
                    data={CountryFilterData}
                    onChange={v => {
                        handleOnChangeRegion(v)
                    }}
                    onReset={handleOnResetRegion}
                />
            </div>
            {loading ?
                <div className='d-flex flex-over-center m-24'><i className='bx bx-loader-alt bx-spin fs-extra'/></div>
                :
                <section className={classes.cards}>
                    {
                        items?.length === 0 ?
                            'No Countries Found'
                            :
                            items?.map?.((i, idx) => <CountryCard key={idx} country={i}/>)
                    }
                </section>
            }
        </>
    );
};

export default HomePage;