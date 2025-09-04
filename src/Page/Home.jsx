import React from 'react';
import Thambel from './HomeComponent/Thambel';
import BrowseByCategory from './HomeComponent/Browsebycategory';
import HotJobs from './HomeComponent/HotJobs';

const Home = () => {
    const jobsPromise = fetch("http://localhost:3000/jobs").then(res => res.json());

    return (
        <>
            <Thambel/>
            <BrowseByCategory/>
            <HotJobs jobsPromise={jobsPromise} />
        </>
    );
};

export default Home;