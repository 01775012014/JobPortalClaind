import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons --- //
// Using functional components for icons to easily pass props like className
const ContentWriterIcon = ({ className }) => (
    
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);

// data acces in mongodb

const HotJobs = ({ jobsPromise }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        jobsPromise
            .then((data) => {
                if (Array.isArray(data)) {
                    // Transform data to ensure compatibility
                    const transformedJobs = data.map(job => ({
                        ...job,
                        id: job._id || job.id,
                        requirements: Array.isArray(job.requirements) ? job.requirements : []
                    }));
                    setJobs(transformedJobs);
                } else {
                    setJobs([]);
                    setError('Invalid data format');
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [jobsPromise]);

    const iconClasses = "w-5 h-5";

    // Category mapping for filtering
    const categoryMapping = {
        'Content Writer': 'Content Writing',
        'Finance': 'Finance',
        'Human Resource': 'Human Resources',
        'Management': 'Management',
        'Market Research': 'Market Research',
        'Marketing & Sale': 'Marketing',
        'Retail & Products': 'Retail',
        'Software': 'Engineering'
    };

    // Filter jobs based on selected category
    const filteredJobs = selectedCategory === 'All' ? jobs : jobs.filter(job => job.category === categoryMapping[selectedCategory] || job.category === selectedCategory);

    const handleFilterClick = (category) => {
        setSelectedCategory(category);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-16">
                {/* --- Header --- */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Jobs of the day</h1>
                    <p className="mt-4 text-lg text-gray-500">Search and connect with the right candidates faster</p>
                </header>

                {/* --- Filters --- */}
                <div className="flex items-center justify-center flex-wrap gap-4 mb-12">
                    <FilterButton icon={<ContentWriterIcon className={iconClasses} />} label="All" active={selectedCategory === 'All'} onClick={handleFilterClick} />
                    <FilterButton icon={<ContentWriterIcon className={iconClasses} />} label="Content Writer" active={selectedCategory === 'Content Writer'} onClick={handleFilterClick} />
                    <FilterButton icon={<FinanceIcon className={iconClasses} />} label="Finance" active={selectedCategory === 'Finance'} onClick={handleFilterClick} />
                    <FilterButton icon={<HumanResourceIcon className={iconClasses} />} label="Human Resource" active={selectedCategory === 'Human Resource'} onClick={handleFilterClick} />
                    <FilterButton icon={<ManagementIcon className={iconClasses} />} label="Management" active={selectedCategory === 'Management'} onClick={handleFilterClick} />
                    <FilterButton icon={<MarketResearchIcon className={iconClasses} />} label="Market Research" active={selectedCategory === 'Market Research'} onClick={handleFilterClick} />
                    <FilterButton icon={<MarketingSaleIcon className={iconClasses} />} label="Marketing & Sale" active={selectedCategory === 'Marketing & Sale'} onClick={handleFilterClick} />
                    <FilterButton icon={<RetailProductsIcon className={iconClasses} />} label="Retail & Products" active={selectedCategory === 'Retail & Products'} onClick={handleFilterClick} />
                    <FilterButton icon={<SoftwareIcon className={iconClasses} />} label="Software" active={selectedCategory === 'Software'} onClick={handleFilterClick} />
                </div>

                {/* --- Job Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredJobs.map((job, index) => (
                        <JobCard
                            key={job.id || job._id || index}
                            logo={job.company_logo}
                            company={job.company}
                            location={job.location}
                            title={job.title}
                            type={job.jobType}
                            posted={job.applicationDeadline}
                            description={job.description}
                            tags={job.requirements || []}
                            salary={job.salaryRange?.min}
                            salaryType={job.salaryRange?.currency}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const FinanceIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const HumanResourceIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
    </svg>
);

const ManagementIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
);

const MarketResearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
        <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path d="M15 2v5h5" />
    </svg>
);

const MarketingSaleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" /><path d="m12 12 4 10 3-3-4-10z" />
    </svg>
);

const RetailProductsIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const SoftwareIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);


// --- Filter Button Component --- //
const FilterButton = ({ icon, label, active = false, onClick }) => {
    const baseClasses = "flex items-center px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200";
    const activeClasses = "bg-blue-50 border-blue-500 text-blue-600";
    const inactiveClasses = "bg-white border-gray-200 text-gray-500 hover:bg-gray-50";

    return (
        <button
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
            onClick={() => onClick(label)}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </button>
    );
};

// --- Job Card Component --- //
const JobCard = ({ logo, company, location, title, type, posted, description, tags = [], salary, salaryType }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src={logo || '/default-logo.png'} alt={`${company || 'Company'} logo`} className="w-10 h-10 object-contain"/>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{company || 'Unknown Company'}</h3>
                    <p className="text-gray-500 text-sm">{location || 'Unknown Location'}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-900">{title || 'Job Title'}</h2>
                <div className="flex items-center space-x-4 text-gray-500 text-sm mt-2">
                    <span>{type || 'Full-time'}</span>
                    <span>&bull;</span>
                    <span>{posted || 'Recently'}</span>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {description || 'Job description not available.'}
            </p>

            <div className="flex items-center space-x-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                    <span className="text-2xl font-bold text-gray-900">${salary || 'N/A'}</span>
                    <span className="text-gray-500">/{salaryType || 'month'}</span>
                </div>
                <Link to="/addjobs" className="bg-blue-100 text-blue-600 font-semibold px-5 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                    Page Detels
                </Link>
            </div>
        </div>
    );
};

export default HotJobs;
