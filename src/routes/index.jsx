import React from 'react';
import HomePage from "../containers/Home";
import DetailsPage from "../containers/Details";
import NotFoundPage from "../containers/NotFound";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const baseUrl = process.env.NODE_ENV === "development" ? "/" : "/rest-countries-app/";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path={baseUrl}>
                <Route index element={<HomePage/>}/>
                <Route path={`${baseUrl}country`}>
                    <Route path=':id' element={<DetailsPage/>}/>
                </Route>
                <Route index element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </Router>
);


export default AppRoutes;