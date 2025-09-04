import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import AddJobForm from './components/AddJobForm';
import { useJobs } from './hooks/useJobs';

const AddJobPage = () => {
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
        <AddJobForm
          editingJob={null}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default AddJobPage;