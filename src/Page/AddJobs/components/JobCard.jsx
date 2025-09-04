import React from 'react';
import { Link} from 'react-router-dom';
import { MapPin, Clock, DollarSign, Calendar, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const JobCard = ({ job, userType, onEdit, onToggleStatus, onDelete }) => {
  if (!job) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={job.company_logo || '/default-logo.png'}
              alt={job.company || 'Company'}
              className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title || 'Job Title'}</h3>
              <p className="text-blue-600 font-medium">{job.company || 'Company'}</p>
            </div>
          </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {job.status === 'active' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />}
            {job.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.location || 'Location not specified'}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.jobType || 'Job type not specified'}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {job.salaryRange?.min ? job.salaryRange.min.toLocaleString() : '0'} -
            {job.salaryRange?.max ? job.salaryRange.max.toLocaleString() : '0'}
            {job.salaryRange?.currency || 'BDT'}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">Deadline: {job.applicationDeadline || 'Not specified'}</span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description || 'No description available'}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.requirements?.length > 0 ? job.requirements.slice(0, 3).map((req, index) => (
          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
            {req}
          </span>
        )) : <span className="text-xs text-gray-500">No requirements</span>}
        {job.requirements?.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <Link
        to={`/jobs/${job.id}`}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Link>

        {userType === 'employer' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(job)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleStatus(job.id)}
              className={`p-2 transition-colors ${
                job.status === 'active'
                  ? 'text-red-600 hover:text-red-700'
                  : 'text-green-600 hover:text-green-700'
              }`}
            >
              {job.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="p-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default JobCard;