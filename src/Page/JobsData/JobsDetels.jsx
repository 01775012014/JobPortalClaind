import React from 'react';
import { useLoaderData } from 'react-router';

const JobsDetels = () => {
    const {
        _id,
        title,
        location,
        jobType,
        category,
        applicationDeadline,
        salaryRange,
        description,
        company,
        requirements,
        responsibilities,
        status,
        hr_email,
        hr_name,
        company_logo
    } = useLoaderData();

    console.log(useLoaderData());

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex items-center mb-6">
                <img src={company_logo} alt={`${company} logo`} className="w-16 h-16 mr-4 rounded-full" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                    <p className="text-lg text-gray-600">{company}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Job Details</h2>
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Job Type:</strong> {jobType}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
                    <p><strong>Status:</strong> {status}</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Salary Range</h2>
                    <p><strong>Min:</strong> {salaryRange.min} {salaryRange.currency.toUpperCase()}</p>
                    <p><strong>Max:</strong> {salaryRange.max} {salaryRange.currency.toUpperCase()}</p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-600">{description}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Requirements</h2>
                <ul className="list-disc list-inside text-gray-600">
                    {requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-600">
                    {responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
                <p><strong>HR Name:</strong> {hr_name}</p>
                <p><strong>HR Email:</strong> <a href={`mailto:${hr_email}`} className="text-blue-500">{hr_email}</a></p>
            </div>

            <div className="text-sm text-gray-500">
                <p><strong>Job ID:</strong> {_id}</p>
            </div>
        </div>
    );
};

export default JobsDetels;