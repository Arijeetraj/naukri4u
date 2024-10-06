// src/components/Jobs.jsx

import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const sampleJobs = [
    {
        _id: '1',
        title: 'Software Engineer',
        description: 'Develop and maintain software applications.',
        location: 'New York, NY',
    },
    {
        _id: '2',
        title: 'Data Scientist',
        description: 'Analyze data and build predictive models.',
        location: 'San Francisco, CA',
    },
    {
        _id: '3',
        title: 'Product Manager',
        description: 'Lead product development and strategy.',
        location: 'Remote',
    },
    // Add more jobs as necessary
];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        // Use sampleJobs instead of allJobs for demonstration purposes
        const jobsToUse = allJobs.length > 0 ? allJobs : sampleJobs;
        
        if (searchedQuery) {
            const filteredJobs = jobsToUse.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(jobsToUse);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-5'>
                <div className='flex gap-10'>
                    <div className='w-30%'>
                        {/* <FilterCard /> */}
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh]'>
                                <div className='grid grid-cols-1 gap-8'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;
