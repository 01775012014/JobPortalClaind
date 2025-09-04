import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from "react-router-dom"
import { useJobs, useJobForm } from './hooks/useJobs';
import { CATEGORIES, JOB_TYPES } from './utils/constants';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import AddJobForm from './components/AddJobForm';

const CareerCodePortal = () => {
  const [userType, setUserType] = useState('employer');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterJobType, setFilterJobType] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    filteredJobs,
    loading,
    error,
    handleAddJob: addJobToServer,
    handleUpdateJob: updateJobOnServer,
    handleDeleteJob: deleteJobFromServer,
    filterJobs
  } = useJobs();

  const {
    formData,
    setFormData,
    editingJob,
    showAddForm,
    setShowAddForm,
    resetForm,
    handleEdit,
    handleCloseForm
  } = useJobForm();

  useEffect(() => {
    filterJobs(searchTerm, filterCategory, filterJobType);
  }, [searchTerm, filterCategory, filterJobType, filterJobs]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    const newJob = {
      ...formData,
      requirements: formData.requirements.split(',').map(req => req.trim()),
      responsibilities: formData.responsibilities.split(',').map(resp => resp.trim()),
      salaryRange: {
        ...formData.salaryRange,
        min: parseInt(formData.salaryRange.min),
        max: parseInt(formData.salaryRange.max)
      },
      status: 'active',
      datePosted: new Date().toISOString().split('T')[0]
    };

    try {
      if (editingJob) {
        await updateJobOnServer(editingJob.id, newJob);
      } else {
        await addJobToServer(newJob);
      }
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteJobFromServer(jobId);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const toggleJobStatus = async (jobId) => {
    const job = filteredJobs.find(j => j.id === jobId);
    if (job) {
      const updatedJob = { ...job, status: job.status === 'active' ? 'inactive' : 'active' };
      try {
        await updateJobOnServer(jobId, updatedJob);
      } catch (error) {
        console.error('Error updating job status:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CAREER-CODE
              </h1>
              <span className="ml-2 text-sm text-gray-500">Job Portal System</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="employer">Employer</option>
                <option value="jobseeker">Job Seeker</option>
              </select>
              
              <Link
                  to='/addjobfom'
                  // onClick={() => setShowAddForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {/* <Plus className="w-4 h-4 mr-2" /> */}
                  Add Job
                </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterJobType}
                onChange={(e) => setFilterJobType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Types</option>
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              userType={userType}
              onEdit={handleEdit}
              onToggleStatus={toggleJobStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            userType={userType}
          />
        )}

        {/* Add Job Form */}
        {showAddForm && (
          <AddJobForm
            editingJob={editingJob}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddJob}
            onClose={handleCloseForm}
            resetForm={resetForm}
          />
        )}
      </main>
    </div>
  );
};

export default CareerCodePortal;