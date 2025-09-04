import { useState, useEffect } from 'react';
import { fetchJobs, addJob, updateJob, deleteJob } from '../api/jobs';
import { INITIAL_FORM_DATA } from '../utils/constants';
import { Routes, Link } from "react-router-dom"

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data);
      setFilteredJobs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleAddJob = async (jobData) => {
    try {
      await addJob(jobData);
      await loadJobs(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleUpdateJob = async (jobId, jobData) => {
    try {
      await updateJob(jobId, jobData);
      await loadJobs(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      await loadJobs(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const filterJobs = (searchTerm, filterCategory, filterJobType) => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(job => job.category === filterCategory);
    }

    if (filterJobType !== 'all') {
      filtered = filtered.filter(job => job.jobType === filterJobType);
    }

    setFilteredJobs(filtered);
  };

  return {
    jobs,
    filteredJobs,
    loading,
    error,
    loadJobs,
    handleAddJob,
    handleUpdateJob,
    handleDeleteJob,
    filterJobs
  };
};

export const useJobForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [editingJob, setEditingJob] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      ...job,
      requirements: job.requirements.join(', '),
      responsibilities: job.responsibilities.join(', '),
      salaryRange: {
        ...job.salaryRange,
        min: job.salaryRange.min.toString(),
        max: job.salaryRange.max.toString()
      }
    });
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingJob(null);
    resetForm();
  };

  return {
    formData,
    setFormData,
    editingJob,
    setEditingJob,
    showAddForm,
    setShowAddForm,
    resetForm,
    handleEdit,
    handleCloseForm
  };
};