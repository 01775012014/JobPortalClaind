import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, JOB_TYPES } from '../utils/constants';
import { useJobs } from '../hooks/useJobs';

const AddJobForm = () => {
  const navigate = useNavigate();
  const { handleAddJob: addJobToServer } = useJobs();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    category: '',
    applicationDeadline: '',
    salaryRange: { min: '', max: '', currency: 'BDT' },
    hr_name: '',
    hr_email: '',
    company_logo: '',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  const handleSubmit = async (e) => {
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
      await addJobToServer(newJob);
      navigate('/addjobs'); // Navigate back to jobs list after successful submission
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleClose = () => {
    navigate('/addjobs'); // Navigate back when closing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Job
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              required
              autoFocus
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Favorite IT"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Halishohor, Chittagong"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
            <select
              required
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {JOB_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
            <input
              type="date"
              required
              value={formData.applicationDeadline}
              onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                required
                value={formData.salaryRange.min}
                onChange={(e) => setFormData({
                  ...formData,
                  salaryRange: { ...formData.salaryRange, min: e.target.value }
                })}
                className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Min Salary"
              />
              <input
                type="number"
                required
                value={formData.salaryRange.max}
                onChange={(e) => setFormData({
                  ...formData,
                  salaryRange: { ...formData.salaryRange, max: e.target.value }
                })}
                className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max Salary"
              />
              <select
                value={formData.salaryRange.currency}
                onChange={(e) => setFormData({
                  ...formData,
                  salaryRange: { ...formData.salaryRange, currency: e.target.value }
                })}
                className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HR Name *</label>
            <input
              type="text"
              required
              value={formData.hr_name}
              onChange={(e) => setFormData({ ...formData, hr_name: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Farhan Rahman"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HR Email *</label>
            <input
              type="email"
              required
              value={formData.hr_email}
              onChange={(e) => setFormData({ ...formData, hr_email: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="hr@company.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo URL</label>
            <input
              type="url"
              value={formData.company_logo}
              onChange={(e) => setFormData({ ...formData, company_logo: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
            <textarea
              required
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed job description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
            <textarea
              required
              rows="3"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="JavaScript, React, Node.js (comma separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities *</label>
            <textarea
              required
              rows="3"
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Develop software, Code reviews (comma separated)"
            />
          </div>
        </div>

            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;