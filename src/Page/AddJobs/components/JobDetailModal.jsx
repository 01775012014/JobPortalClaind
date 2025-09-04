import React from 'react';
import { Routes, Link } from "react-router-dom"
import { MapPin, Clock, DollarSign, Building, Mail, User, Calendar, XCircle } from 'lucide-react';

const JobDetailModal = ({ job, onClose, userType }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={job.company_logo || '/default-logo.png'}
                alt={job.company || 'Company'}
                className="w-16 h-16 rounded-lg object-cover border-2 border-gray-100"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{job.title || 'Job Title'}</h2>
                <p className="text-blue-600 font-medium text-lg">{job.company || 'Company'}</p>
              </div>
            </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-blue-500" />
              <span>{job.location || 'Location not specified'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-3 text-blue-500" />
              <span>{job.jobType || 'Job type not specified'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-5 h-5 mr-3 text-blue-500" />
              <span>
                {job.salaryRange?.min ? job.salaryRange.min.toLocaleString() : '0'} -
                {job.salaryRange?.max ? job.salaryRange.max.toLocaleString() : '0'}
                {job.salaryRange?.currency || 'BDT'}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Building className="w-5 h-5 mr-3 text-blue-500" />
              <span>{job.category || 'Category not specified'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-blue-500" />
              <span>Deadline: {job.applicationDeadline || 'Not specified'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-blue-500" />
              <span>{job.hr_name || 'HR name not specified'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description || 'No description available'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
            <div className="flex flex-wrap gap-2">
              {job.requirements?.length > 0 ? job.requirements.map((req, index) => (
                <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                  {req}
                </span>
              )) : <span>No requirements specified</span>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.responsibilities?.length > 0 ? job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              )) : <li>No responsibilities specified</li>}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">{job.hr_email || 'No email provided'}</span>
            </div>
          </div>
        </div>

        {userType === 'jobseeker' && (
          <div className="mt-6 pt-6 border-t">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default JobDetailModal;